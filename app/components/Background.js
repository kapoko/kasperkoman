import { useState, useEffect } from 'react';

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

        imgLoader.addEventListener('load', () => {
            clearTimeout(timer);
            setLazySrc(src);
        });
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

export default Background;