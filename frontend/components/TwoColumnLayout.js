export default class extends React.Component {
    render() {
        const { left, right } = this.props

        return (
            <div className="columns is-marginless">
                <div className="column is-half is-marginless">
                    { left }
                </div>
                <div className="column is-half is-marginless">
                    { right }
                </div>
            </div>
        )
    }
}