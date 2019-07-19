import Logo from './Logo'

export default ({ left, right }) => {
    return (
        <div className="columns">
            <div className="column is-half">
                { left }
                <Logo className="is-hidden-tablet" />
            </div>
            <div className="column is-half">
                { right }
            </div>
        </div>
    )
}
