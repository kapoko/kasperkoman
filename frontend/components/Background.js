class Background extends React.Component {
    state = { src: null };

    componentDidMount() {
        const { src } = this.props;
        const imgLoader = new Image();
        imgLoader.src = this.props.src;

        let timer = setTimeout(() => {
            // If not loaded after 500ms, show loader
            if (!this.state.src) {
                this.setState({ showLoader: true });
            }
        }, 500);

        imgLoader.onload = () => {
            clearTimeout(timer);
            this.setState({ src });
        }
    }

    render() {
        return ([
            <div 
                key={this.props.src}
                className={'background' + ((this.state.src) ? ' is-loaded' : '')} >
                    <div className={`loader ${(this.state.showLoader) ? 'is-active' : ''}`}></div>
                    <div className="inner" style={{ backgroundImage: `url(${this.state.src || ''})` }}></div>
            </div>
        ])
    }
}

export default Background;