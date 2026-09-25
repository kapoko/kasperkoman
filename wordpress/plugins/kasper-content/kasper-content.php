<?php

/**
 * Plugin Name: Kasper Koman Content
 * Description: Releases and gigs, their editorial fields, migration command, and Astro build hook.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

final class Kasper_Koman_Content
{
    private static $build_needed = false;

    public static function init()
    {
        add_action('init', [self::class, 'register_content']);
        add_action('add_meta_boxes', [self::class, 'add_meta_boxes']);
        add_action('save_post', [self::class, 'save_fields']);
        add_action('save_post_release', [self::class, 'request_build']);
        add_action('save_post_gig', [self::class, 'request_build']);
        add_action('updated_post_meta', [self::class, 'request_build_for_meta'], 10, 4);
        add_action('added_post_meta', [self::class, 'request_build_for_meta'], 10, 4);
        add_action('shutdown', [self::class, 'trigger_build']);
        add_filter('manage_gig_posts_columns', [self::class, 'gig_columns']);
        add_action('manage_gig_posts_custom_column', [self::class, 'gig_column_value'], 10, 2);
        add_filter('manage_edit-gig_sortable_columns', [self::class, 'gig_sortable_columns']);
        add_action('pre_get_posts', [self::class, 'sort_gigs']);
        add_filter('rest_prepare_attachment', [self::class, 'release_cover_fallback'], 10, 3);
    }

    public static function release_cover_fallback($response, $attachment)
    {
        $data = $response->get_data();
        $cover = $data['media_details']['sizes']['release-cover'] ?? null;
        $original_path = get_attached_file($attachment->ID);
        $cover_path = !empty($cover['file']) ? trailingslashit(dirname($original_path)) . $cover['file'] : '';

        if (!empty($cover['source_url']) && $cover_path && file_exists($cover_path)) {
            return $response;
        }

        $original_url = wp_get_attachment_url($attachment->ID);
        if (!$original_url) {
            return $response;
        }

        $data['media_details']['sizes']['release-cover'] = ['source_url' => $original_url];
        $response->set_data($data);
        return $response;
    }

    public static function gig_columns($columns)
    {
        $updated = [];
        foreach ($columns as $key => $label) {
            $updated[$key] = $label;
            if ($key === 'title') {
                $updated['gig_date'] = 'Gig date';
            }
        }
        return $updated;
    }

    public static function gig_column_value($column, $post_id)
    {
        if ($column === 'gig_date') {
            echo esc_html(get_post_meta($post_id, 'gig_date', true));
        }
    }

    public static function gig_sortable_columns($columns)
    {
        $columns['gig_date'] = 'gig_date';
        return $columns;
    }

    public static function sort_gigs($query)
    {
        if (!is_admin() || !$query->is_main_query() || $query->get('post_type') !== 'gig' || $query->get('orderby') !== 'gig_date') {
            return;
        }
        $query->set('meta_key', 'gig_date');
        $query->set('meta_type', 'DATE');
        $query->set('orderby', 'meta_value');
    }

    public static function register_content()
    {
        register_post_type('release', [
            'labels' => [
                'name' => 'Releases', 'singular_name' => 'Release',
                'add_new' => 'Add Release', 'add_new_item' => 'Add Release',
            ],
            'public' => true, 'show_in_rest' => true, 'rest_base' => 'releases', 'menu_icon' => 'dashicons-album',
            'supports' => ['title', 'thumbnail', 'custom-fields'], 'has_archive' => false,
        ]);
        register_post_type('gig', [
            'labels' => [
                'name' => 'Gigs', 'singular_name' => 'Gig',
                'add_new' => 'Add Gig', 'add_new_item' => 'Add Gig',
            ],
            'public' => true, 'show_in_rest' => true, 'rest_base' => 'gigs', 'menu_icon' => 'dashicons-tickets-alt',
            'supports' => ['title', 'custom-fields'], 'has_archive' => false,
        ]);

        foreach (
            ['release' => [
            'release_subtitle', 'release_date', 'release_label', 'release_links', 'release_original_artist', 'strapi_id',
            ], 'gig' => [
            'gig_date', 'gig_city', 'gig_country_code', 'gig_url', 'gig_venue', 'strapi_id',
            ]] as $type => $keys
        ) {
            foreach ($keys as $key) {
                register_post_meta($type, $key, ['single' => true, 'type' => 'string', 'show_in_rest' => true, 'auth_callback' => '__return_true']);
            }
        }
        add_image_size('release-cover', 1080, 1080, true);
    }

    public static function add_meta_boxes()
    {
        add_meta_box('kk-release-fields', 'Release details', [self::class, 'release_fields'], 'release', 'normal', 'high');
        add_meta_box('kk-gig-fields', 'Gig details', [self::class, 'gig_fields'], 'gig', 'normal', 'high');
    }

    private static function field($post, $key, $label, $type = 'text')
    {
        $value = get_post_meta($post->ID, $key, true);
        printf('<p><label for="%1$s"><strong>%2$s</strong></label><br>', esc_attr($key), esc_html($label));
        if ($type === 'textarea') {
            printf('<textarea class="widefat" rows="5" id="%1$s" name="%1$s">%2$s</textarea>', esc_attr($key), esc_textarea($value));
        } else {
            printf('<input class="widefat" type="%1$s" id="%2$s" name="%2$s" value="%3$s">', esc_attr($type), esc_attr($key), esc_attr($value));
        }
        echo '</p>';
    }

    public static function release_fields($post)
    {
        wp_nonce_field('kk_content', 'kk_content_nonce');
        self::field($post, 'release_subtitle', 'Subtitle');
        self::field($post, 'release_date', 'Release date', 'date');
        self::field($post, 'release_label', 'Label');
        self::field($post, 'release_original_artist', 'Original artist');
        self::field($post, 'release_links', 'Links (one "Label: URL" per line)', 'textarea');
    }

    public static function gig_fields($post)
    {
        wp_nonce_field('kk_content', 'kk_content_nonce');
        self::field($post, 'gig_date', 'Date', 'date');
        self::field($post, 'gig_city', 'City');
        self::field($post, 'gig_country_code', 'Country code');
        self::field($post, 'gig_venue', 'Venue');
        self::field($post, 'gig_url', 'Ticket / event URL', 'url');
    }

    public static function save_fields($post_id)
    {
        if (!isset($_POST['kk_content_nonce']) || !wp_verify_nonce($_POST['kk_content_nonce'], 'kk_content') || wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
            return;
        }
        $type = get_post_type($post_id);
        $fields = $type === 'release' ? ['release_subtitle', 'release_date', 'release_label', 'release_links', 'release_original_artist'] : ($type === 'gig' ? ['gig_date', 'gig_city', 'gig_country_code', 'gig_venue', 'gig_url'] : []);
        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                update_post_meta($post_id, $field, sanitize_textarea_field(wp_unslash($_POST[$field])));
            }
        }
    }

    public static function request_build()
    {
        self::$build_needed = true;
    }
    public static function request_build_for_meta($meta_id, $post_id)
    {
        if (in_array(get_post_type($post_id), ['release', 'gig'], true)) {
            self::$build_needed = true;
        }
    }
    public static function trigger_build()
    {
        if (!self::$build_needed || defined('KK_IMPORTING')) {
            return;
        }
        wp_remote_post(defined('KK_ASTRO_WEBHOOK_URL') ? KK_ASTRO_WEBHOOK_URL : '', [
            'timeout' => 2, 'blocking' => false,
            'headers' => ['X-Build-Secret' => defined('KK_BUILD_WEBHOOK_SECRET') ? KK_BUILD_WEBHOOK_SECRET : ''],
        ]);
    }

    public static function import($args, $assoc_args)
    {
        define('KK_IMPORTING', true);
        $source = rtrim($assoc_args['source'] ?? '/import', '/');
        $media_source = rtrim($assoc_args['media-source'] ?? $source, '/');
        $uploads = self::read_ndjson("$source/export/upload-files.json");
        $media_by_release = [];
        $release_media_ids = [];
        foreach ($uploads as $upload) {
            foreach (($upload['related'] ?? []) as $related) {
                $release_id = self::oid($related['ref'] ?? '');
                if (($related['kind'] ?? '') === 'Release' && $release_id) {
                    $media_by_release[$release_id] = $upload;
                }
            }
        }
        $releases = self::read_ndjson("$source/export/releases.json");
        foreach ($releases as $release) {
            $release_id = self::oid($release['_id'] ?? '');
            if (isset($media_by_release[$release_id])) {
                $release_media_ids[self::oid($media_by_release[$release_id]['_id'] ?? '')] = true;
            }
        }
        $release_count = self::import_releases($releases, $media_by_release, $media_source);
        $gig_count = self::import_gigs(self::read_ndjson("$source/export/gigs.json"));
        self::import_nonrelease_media($uploads, $release_media_ids, $media_source);
        WP_CLI::success("Imported $release_count releases and $gig_count gigs.");
    }

    private static function read_ndjson($file)
    {
        if (!is_readable($file)) {
            WP_CLI::error("Missing import file: $file");
        }
        return array_map(static fn($line) => json_decode($line, true), array_filter(file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES)));
    }

    private static function post_for_id($type, $strapi_id)
    {
        $posts = get_posts(['post_type' => $type, 'meta_key' => 'strapi_id', 'meta_value' => $strapi_id, 'posts_per_page' => 1, 'post_status' => 'any']);
        return $posts ? $posts[0]->ID : 0;
    }

    private static function oid($value)
    {
        return is_array($value) ? ($value['$oid'] ?? '') : $value;
    }
    private static function date($value)
    {
        return is_array($value) ? substr($value['$date'] ?? '', 0, 10) : substr((string) $value, 0, 10);
    }

    private static function import_releases($releases, $media_by_release, $source)
    {
        $count = 0;
        foreach ($releases as $release) {
            $id = self::oid($release['_id'] ?? '');
            $post_id = self::post_for_id('release', $id);
            if (!$post_id) {
                $post_id = wp_insert_post(['post_type' => 'release', 'post_status' => 'publish', 'post_title' => $release['title'] ?? 'Untitled release']);
            }
            update_post_meta($post_id, 'strapi_id', $id);
            foreach (['subtitle' => 'release_subtitle', 'label' => 'release_label', 'links' => 'release_links', 'originalArtist' => 'release_original_artist'] as $old => $new) {
                update_post_meta($post_id, $new, $release[$old] ?? '');
            }
            update_post_meta($post_id, 'release_date', self::date($release['releaseDate'] ?? ''));
            if (isset($media_by_release[$id]) && !has_post_thumbnail($post_id)) {
                self::import_cover($post_id, $media_by_release[$id], "$source/uploads");
            }
            $count++;
        }
        return $count;
    }

    private static function import_gigs($gigs)
    {
        $count = 0;
        foreach ($gigs as $gig) {
            $id = self::oid($gig['_id'] ?? '');
            $post_id = self::post_for_id('gig', $id);
            if (!$post_id) {
                $post_id = wp_insert_post(['post_type' => 'gig', 'post_status' => 'publish', 'post_title' => $gig['title'] ?? 'Untitled gig']);
            }
            update_post_meta($post_id, 'strapi_id', $id);
            foreach (['city' => 'gig_city', 'countryCode' => 'gig_country_code', 'url' => 'gig_url', 'venue' => 'gig_venue'] as $old => $new) {
                update_post_meta($post_id, $new, $gig[$old] ?? '');
            }
            update_post_meta($post_id, 'gig_date', self::date($gig['date'] ?? ''));
            $count++;
        }
        return $count;
    }

    private static function import_nonrelease_media($uploads, $release_media_ids, $source)
    {
        foreach ($uploads as $upload) {
            if (empty($release_media_ids[self::oid($upload['_id'] ?? '')])) {
                self::import_cover(0, $upload, "$source/uploads");
            }
        }
    }

    private static function import_cover($post_id, $upload, $uploads_dir)
    {
        $media_id = self::oid($upload['_id'] ?? '');
        $existing = get_posts(['post_type' => 'attachment', 'meta_key' => 'strapi_media_id', 'meta_value' => $media_id, 'posts_per_page' => 1, 'post_status' => 'any']);
        if ($existing) {
            if ($post_id) {
                set_post_thumbnail($post_id, $existing[0]->ID);
            }
            return;
        }
        $formats = $upload['formats'] ?? [];
        $url = $formats['large']['url'] ?? $formats['square']['url'] ?? $upload['url'] ?? '';
        $file = "$uploads_dir/" . basename($url);
        if (!is_readable($file)) {
            WP_CLI::warning("Missing cover: $file");
            return;
        }
        $bits = wp_upload_bits(basename($file), null, file_get_contents($file));
        if ($bits['error']) {
            WP_CLI::warning($bits['error']);
            return;
        }
        $type = wp_check_filetype($bits['file']);
        $attachment_id = wp_insert_attachment(['post_mime_type' => $type['type'], 'post_title' => sanitize_file_name($upload['name'] ?? basename($file)), 'post_status' => 'inherit'], $bits['file'], $post_id);
        require_once ABSPATH . 'wp-admin/includes/image.php';
        wp_update_attachment_metadata($attachment_id, wp_generate_attachment_metadata($attachment_id, $bits['file']));
        update_post_meta($attachment_id, 'strapi_media_id', $media_id);
        if ($post_id) {
            set_post_thumbnail($post_id, $attachment_id);
        }
    }
}

Kasper_Koman_Content::init();

if (defined('WP_CLI') && WP_CLI) {
    WP_CLI::add_command('kasper import', [Kasper_Koman_Content::class, 'import']);
}
