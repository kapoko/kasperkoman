import React, { Component } from 'react'
import supportsWebP from 'supports-webp';

const WebpSupportContext = React.createContext();

class WebpSupportProvider extends Component {

    state = {
        webpSupport: null
    }

    setWebpSupport = (webpSupport) => {
        this.setState({
            webpSupport: webpSupport
        });
    }

    componentDidMount() {
        supportsWebP.then(supported => {
            this.setWebpSupport(supported);
        });
    }

    render() {
        return (
            <WebpSupportContext.Provider 
                value={{ 
                    webpSupport: this.state.webpSupport,
                }}
            >
                {this.props.children}
            </WebpSupportContext.Provider>
        )
    }
}

const WebpSupportConsumer = WebpSupportContext.Consumer

export { WebpSupportConsumer }
export default WebpSupportProvider

