import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import disableScroll from 'disable-scroll';
import Router, { withRouter } from 'next/router';

import ActiveLink from './ActiveLink';


const Navbar = ({ router }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        const handleRouteChange = () => {
            setMenuOpen(false);
        }
      
        Router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            Router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])

    return (
        <header className={menuOpen ? 'menu-open' : ''}>
            <nav className="navbar is-fixed-top is-transparent is-spaced" role="navigation" aria-label="main navigation">
                <button onClick={toggleMenu} className={`hamburger hamburger--collapse ${menuOpen ? 'active' : ''}`} type="button" aria-label="Open menu">
                    <div className="inner">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </button>
                <CSSTransition in={menuOpen} timeout={400} classNames="menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <ActiveLink href="/">Home</ActiveLink>
                        </div>
                        <div className='separator'>/</div>
                        <div className="navbar-item">
                            <ActiveLink href="/releases">Releases</ActiveLink>
                        </div>
                        <div className='separator'>/</div>
                        <div className="navbar-item">
                            <ActiveLink href="/contact">Contact</ActiveLink>
                        </div>
                    </div>
                </CSSTransition>
            </nav>
        </header>
    )
}

export default withRouter(Navbar)