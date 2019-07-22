import Logo from './Logo'

export default ({ left, right, reduceColumnsMobile }) => {
    return (
        <div className="columns">
            <div className="column is-half">
                { left }
                <Logo className={`is-hidden-tablet ${reduceColumnsMobile ? 'is-hidden-mobile' : ''}`} />
            </div>
            <div className={`column is-half ${reduceColumnsMobile ? 'is-hidden-mobile' : ''}`}>
                { right }
            </div>
        </div>
    )
}
