const trackPageView = (url) => {
    try {
        window.gtag('config', 'UA-37689068-1', {
            page_location: url
        });
    } catch (error) {
        // Silences error if failed to load
    }
}

export default trackPageView