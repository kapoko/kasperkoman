import { useState, useEffect } from 'react';
import { WebpSupportConsumer } from './WebpSupportProvider';

const Background = props => {
    const { src } = props;
    const load = (props.load === undefined) ? true : props.load;

    const [lazySrc, setLazySrc] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        if (!load || lazySrc) {
            return;
        }
        
        const imgLoader = new Image();
        imgLoader.src = src;

        let timer = setTimeout(() => {
            // If not loaded after 500ms, show loader
            if (!src) {
                setShowLoader(true);
            }
        }, 500);

        imgLoader.onload = () => {
            clearTimeout(timer);
            setLazySrc(src);
        }
    }, [load]);

    return (
        <div 
            key={src}
            className={'background' + ((lazySrc) ? ' is-loaded' : '')} >
                <div className={`loader ${(showLoader) ? 'is-active' : ''}`}></div>
                <div className="inner" style={{ backgroundImage: `url(${lazySrc || ''})` }}></div>
        </div>
    )
}

const WebpBackground = () => {
    const { src, fallback, ...rest } = this.props;

    return (
        <WebpSupportConsumer>
            {({ webpSupport }) => {
                // Wait for webpSupport to become true or false
                if (webpSupport === null) return; 
                return ( <Background src={(webpSupport) ? src : fallback } {...rest}/> );
            }}
        </WebpSupportConsumer>
    )
}

export { WebpBackground }; 
export default Background;