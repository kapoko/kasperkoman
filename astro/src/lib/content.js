const apiUrl = process.env.WORDPRESS_API_URL || 'http://localhost:8080';
const publicUrl = process.env.PUBLIC_WORDPRESS_URL || apiUrl;

function publicMediaUrl(url) {
  return url ? url.replace(apiUrl, publicUrl) : url;
}

function decodeHtmlEntities(value) {
  const named = { amp: '&', apos: "'", gt: '>', lt: '<', quot: '"' };
  return value.replace(/&(?:#(\d+)|#x([\da-f]+)|([a-z]+));/gi, (entity, decimal, hex, name) => {
    if (decimal) return String.fromCodePoint(Number(decimal));
    if (hex) return String.fromCodePoint(Number.parseInt(hex, 16));
    return named[name.toLowerCase()] || entity;
  });
}

async function getPosts(type) {
  const response = await fetch(`${apiUrl}/?rest_route=/wp/v2/${type}&per_page=100&status=publish&_embed`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Could not fetch ${type}: ${response.status}`);
  const posts = await response.json();
  return posts.map((post) => ({
    ...post,
    title: { ...post.title, rendered: decodeHtmlEntities(post.title.rendered) },
  }));
}

export async function getGigs() {
  const gigs = await getPosts('gigs');
  return gigs
    .sort((a, b) => new Date(b.meta.gig_date) - new Date(a.meta.gig_date))
    .slice(0, 10);
}

export async function getReleases() {
  return getPosts('releases');
}

export function coverUrl(release) {
  const media = release._embedded?.['wp:featuredmedia']?.[0];
  return publicMediaUrl(media?.media_details?.sizes?.large?.source_url || media?.source_url);
}

export function squareCoverUrl(release) {
  const media = release._embedded?.['wp:featuredmedia']?.[0];
  return publicMediaUrl(media?.media_details?.sizes?.['release-cover']?.source_url || media?.media_details?.sizes?.medium?.source_url || media?.source_url);
}
