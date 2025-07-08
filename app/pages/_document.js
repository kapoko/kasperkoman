import Document, { Html, Head, Main, NextScript } from "next/document";
import fs from "fs";
import path from "path";

import getConfig from "next/config";
const { GTAG } = getConfig().publicRuntimeConfig;

class InlineStylesHead extends Head {
    getCssLinks = ({ allFiles }) => {
        const { assetPrefix } = this.context;
        if (!allFiles || allFiles.length === 0) return null;

        return allFiles
            .filter((file) => /\.css$/.test(file))
            .map((file) => (
                <style
                    key={file}
                    nonce={this.props.nonce}
                    data-href={`${assetPrefix}/_next/${file}`}
                    dangerouslySetInnerHTML={{
                        __html: fs.readFileSync(
                            path.join(process.cwd(), ".next", file),
                            "utf-8",
                        ),
                    }}
                />
            ));
    };
}

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const isProduction = process.env.NODE_ENV === "production";
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps, isProduction };
    }

    setGoogleTags() {
        return {
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GTAG}');
            `,
        };
    }

    render() {
        const { isProduction } = this.props;

        return (
            <Html lang="en">
                <InlineStylesHead>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />

                    <meta name="description" content="Official home of Kasper Koman." />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/static/favicons/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/static/favicons/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/static/favicons/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/static/favicons/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/static/favicons/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta
                        name="msapplication-config"
                        content="/static/favicons/browserconfig.xml"
                    />
                    <meta name="theme-color" content="#ffffff" />
                </InlineStylesHead>
                <body>
                    <Main />
                    <NextScript />
                    {isProduction && (
                        <>
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`}
                            />
                            <script dangerouslySetInnerHTML={this.setGoogleTags()} />
                        </>
                    )}
                    {/* Empty script tag as chrome bug fix, see https://stackoverflow.com/a/42969608/943337 */}
                    <script> </script>
                </body>
            </Html>
        );
    }
}
