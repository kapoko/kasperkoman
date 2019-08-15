import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSoundcloud, faFacebook, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

let timer = null;

const SocialLink = ({href, linkTargetName, icon, functions, ...props}) => (
    <a href={href}
        title={`Kasper Koman on ${linkTargetName}`} 
        onMouseEnter={() => functions.change(linkTargetName)} 
        onMouseLeave={() => functions.reset()}
        target="_blank" rel="noreferrer noopener">
        <FontAwesomeIcon icon={icon} />
    </a>
)

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
                <span className={`link-target ${(linkTargetActive) ? 'is-active' : ''}`}>{linkTarget}</span>
            )}
            <SocialLink href="https://soundcloud.com/kasperkoman" linkTargetName="Soundcloud" icon={faSoundcloud} functions={{change, reset}} />
            <SocialLink href="https://instagram.com/kasperkoman" linkTargetName="Instagram" icon={faInstagram} functions={{change, reset}} />
            <SocialLink href="https://facebook.com/kasperkomanofficial" linkTargetName="Facebook" icon={faFacebook} functions={{change, reset}} />
            <SocialLink href="https://open.spotify.com/artist/2fjKKBOOCTqkDTRC7wH6dO?si=c014lpJtTuSJr-zikifyYQ" linkTargetName="Spotify" icon={faSpotify} functions={{change, reset}} />
            <SocialLink href="https://www.beatport.com/artist/kasper-koman/69322" linkTargetName="Beatport" icon={faHeadphones} functions={{change, reset}} />
        </p>
    )
}
export default SocialLinks