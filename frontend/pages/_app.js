import React from 'react';
import App, { Container } from 'next/app';
import Head from "next/head";


import "../styles/main.scss";

import Fonts from '../components/Fonts'
import Navbar from '../components/Navbar';


class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        
        return { pageProps };
    }

    componentDidMount() {
        Fonts();
    }
    
    render() {
        const { Component, pageProps } = this.props;
        
        return (

            <Container>
                <Head>
                    <title>Kasper Koman</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
            
                <Navbar />
                
                <main className="main container is-fluid">
                    <Component {...pageProps} />
                </main>
            
            </Container>
        )
    }
}
    
export default MyApp;