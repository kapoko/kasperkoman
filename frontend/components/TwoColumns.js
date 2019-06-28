export default class extends React.Component {
    render() {
        const { left, right } = this.props

        return (
            <div className="columns is-marginless">
                <div className="column is-half is-marginless">
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
}