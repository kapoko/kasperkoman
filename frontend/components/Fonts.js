import FontFaceObserver from 'fontfaceobserver'

const Fonts = () => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700';
    link.rel = 'stylesheet';
    
    document.head.appendChild(link);
    
    const robotoMono = new FontFaceObserver('Roboto Mono');
    
    robotoMono.load(null, 5000).then(() => {
        document.documentElement.classList.add('roboto-mono');
    })
}

export default Fonts