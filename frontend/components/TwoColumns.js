export default ({ left, right }) => {
    return (
        <div className="columns">
            <div className="column is-half">
                { left }
                <svg className="logo" role="img">
                    <use xlinkHref="static/logo.svg#kk_logo"/>
                </svg>
            </div>
            <div className="column is-half">
                { right }
            </div>
        </div>
    )
}
