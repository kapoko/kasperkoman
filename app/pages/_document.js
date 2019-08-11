
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { readFileSync } from 'fs';
import { join } from 'path';

class InlineStylesHead extends Head {
    getCssLinks() {
        return this.__getInlineStyles();
    }

    __getInlineStyles() {
        const { assetPrefix, files } = this.context._documentProps;
        if (!files || files.length === 0) return null;

        return files.filter(file => /\.css$/.test(file)).map(file => (
            <style
                key={file}
                data-href={`${assetPrefix}/_next/${file}`}
                dangerouslySetInnerHTML={{
                __html: readFileSync(join(process.cwd(), '.next', file), 'utf-8'),
                }}
            />
        ));
    }
}

export default class MyDocument extends Document {
    render () {
        return (
            <Html lang="en">
                <InlineStylesHead>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>

                    <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png"/>
                    <link rel="manifest" href="/static/favicons/site.webmanifest"/>
                    <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5"/>
                    <meta name="msapplication-TileColor" content="#da532c"/>
                    <meta name="msapplication-config" content="/static/favicons/browserconfig.xml"/>
                    <meta name="theme-color" content="#ffffff"/>
                </InlineStylesHead>
                <body>
                    <Main />
                    <NextScript />
                    {/* Empty script tag as chrome bug fix, see https://stackoverflow.com/a/42969608/943337 */}
                    <script> </script>
                </body>
            </Html>
        )
    }
}