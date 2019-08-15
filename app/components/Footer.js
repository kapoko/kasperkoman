import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';

export default () => (
    <footer className="nav-bottom copyright">
        <p>
            <FontAwesomeIcon icon={faCopyright}/> Kasper Koman { new Date().getFullYear() }
            <span className="separator"> / </span>
            <a href="https://github.com/kapoko/kasperkoman" target="_blank" className="no-line" title="Source on Github">Source on <FontAwesomeIcon icon={faGithub}/> Github</a>
            <span className="separator"> / </span>
            <Link href="/privacy"><a className="no-line">Privacy</a></Link>
        </p>
    </footer>
)