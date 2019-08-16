import getConfig from 'next/config';
const { GTAG } = getConfig().publicRuntimeConfig;

const trackPageView = (url) => {
    try {
        window.gtag('config', GTAG, {
            page_location: url
        });
    } catch (error) {
        // Silences error if failed to load
    }
}

export default trackPageView