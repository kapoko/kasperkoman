import NavbarItem from './NavbarItem'

export default function Header() {
    return (
        <header>
            <nav className="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-end">
                    <NavbarItem href="/">
                        <a>Home</a>
                    </NavbarItem>
                    <div className="separator">/</div>
                    <NavbarItem href="/about">
                        <a>About</a>
                    </NavbarItem>
                    <div className="separator">/</div>
                    <NavbarItem href="/bookings">
                        <a>Bookings</a>
                    </NavbarItem>
                </div>
            </nav>
        </header>
    )
}