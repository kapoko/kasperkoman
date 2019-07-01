export default ({ left, right }) => {
    return (
        <div className="columns is-marginless">
            <div className="column is-half is-marginless is-paddingless">
                { left }
                <svg className="logo" role="img">
                    <use xlinkHref="static/logo.svg#kk_logo"/>
                </svg>
            </div>
            <div className="column is-half is-marginless">
                { right }
            </div>
        </div>
    )
}
