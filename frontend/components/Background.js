class Background extends React.Component {
    state = { src: null };

    componentDidMount() {
        const { src } = this.props;
        const imgLoader = new Image();
        imgLoader.src = this.props.src;

        imgLoader.onload = () => {
            this.setState({ src });
        }
    }

    render() {
        return ([
            <div 
                key={this.props.src}
                className={'background' + ((this.state.src) ? ' is-loaded' : '')} >
                    <div className="loader"></div>
                    <div className="inner" style={{ backgroundImage: `url(${this.state.src || ''})` }}></div>
            </div>
        ])
    }
}

export default Background;