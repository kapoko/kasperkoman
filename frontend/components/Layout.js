import React from "react";
import Head from "next/head";
import Navbar from './Navbar';
import Fonts from './Fonts'

import "../styles/main.scss"

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        Fonts();
    }

    render() {
        const { children } = this.props;
        const title = "Kasper Koman";
      
        return (
            <div>
                <Head>
                    <title>{ title }</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>

                <Navbar />

                <div className="container is-fluid">
                    { children }
                </div>

            </div>
        );
    }
}
  
export default Layout;