import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSoundcloud, faFacebook, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

let timer = null;

const SocialLinks = props => {

    const { className, ...rest } = props; 
    const hasLinkTarget = (props.hasLinkTarget === undefined) ? true : props.hasLinkTarget;

    const reset = () => {
        timer = setTimeout(() => {
            setLinkTargetActive(false);
        }, 500);
    }

    const change = (newLinkTarget) => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        setLinkTargetActive(true);
        setLinkTarget(newLinkTarget);
    }

    const [linkTarget, setLinkTarget] = useState('');
    const [linkTargetActive, setLinkTargetActive] = useState(false);

    return (
        <p className={`social-links ${className ? className : ''}`}>
            { hasLinkTarget && (
                <span className={(linkTargetActive) ? 'is-active' : ''}>{linkTarget}</span>
            )}
            <a href="https://soundcloud.com/kasperkoman" 
                title="Kasper Koman on Soundcloud" 
                onMouseEnter={() => change('Soundcloud')} 
                onMouseLeave={() => reset()}
                target="_blank" rel="noreferrer noopener">
                <FontAwesomeIcon icon={faSoundcloud} />
            </a>
            <a href="https://instagram.com/kasperkoman" 
                title="Kasper Koman on Instagram" 
                onMouseEnter={() => change('Instagram')} 
                onMouseLeave={() => reset()}
                target="_blank" rel="noreferrer noopener">
                <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://facebook.com/kasperkomanofficial" 
                title="Kasper Koman on Facebook" 
                onMouseEnter={() => change('Facebook')} 
                onMouseLeave={() => reset()}
                target="_blank" rel="noreferrer noopener">
                <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://open.spotify.com/artist/2fjKKBOOCTqkDTRC7wH6dO?si=c014lpJtTuSJr-zikifyYQ" 
                title="Kasper Koman on Spotify" 
                onMouseEnter={() => change('Spotify')} 
                onMouseLeave={() => reset()}
                target="_blank" rel="noreferrer noopener">
                <FontAwesomeIcon icon={faSpotify} />
            </a>
            <a href="https://www.beatport.com/artist/kasper-koman/69322" 
                title="Kasper Koman on Beatport" 
                onMouseEnter={() => change('Beatport')} 
                onMouseLeave={() => reset()}
                target="_blank" rel="noreferrer noopener">
                <FontAwesomeIcon icon={faHeadphones} />
            </a>
        </p>
    )
}
export default SocialLinks