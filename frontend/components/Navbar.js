import NavbarItem from './NavbarItem'

export default function Navbar() {
    return (
        <header>
            <nav className="navbar is-fixed-top is-transparent is-spaced" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-end">
                    <NavbarItem href="/">
                        <a className="is-stripeless">Home</a>
                    </NavbarItem>
                    <div className="separator">/</div>
                    <NavbarItem href="/releases">
                        <a className="is-stripeless">Releases</a>
                    </NavbarItem>
                    <div className="separator">/</div>
                    <NavbarItem href="/bookings">
                        <a className="is-stripeless">Bookings</a>
                    </NavbarItem>
                </div>
            </nav>
        </header>
    )
}