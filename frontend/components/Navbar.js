import ActiveLink from './ActiveLink'

const Navbar = () => (
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
                <div className="navbar-item">
                    <ActiveLink href="/">Home</ActiveLink>
                </div>
                <div className='separator'>/</div>
                <div className="navbar-item">
                    <ActiveLink href="/releases">Releases</ActiveLink>
                </div>
                <div className='separator'>/</div>
                <div className="navbar-item">
                    <ActiveLink href="/bookings">Bookings</ActiveLink>
                </div>
            </div>
        </nav>
    </header>
)
export default Navbar