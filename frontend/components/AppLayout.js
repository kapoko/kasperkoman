import React from "react";
import App, { Container } from 'next/app'
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
        const title = "Kasper Koman";
      
        return (
            <Container>
                <Head>
                    <title>{ title }</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>

                <Navbar />

                <main className="main container is-fluid">
                    <div className="columns is-marginless">
                        <div className="column is-half is-marginless">
                            { this.props.children }
                        </div>
                        <div className="column is-half is-marginless">
                            { this.props.children.left }
                        </div>
                    </div>
                </main>

            </Container>
        );
    }
}
  
export default Layout;