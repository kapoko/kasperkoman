import React from 'react';
import App, { Container } from 'next/app';
import Head from "next/head";
import svg4everybody from 'svg4everybody'

// import withData from "../lib/apollo";
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

import "../styles/main.scss";

import Fonts from '../components/Fonts'
import Navbar from '../components/Navbar';


 
class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        
        return { pageProps };
    }

    componentDidMount() {
        Fonts();
        svg4everybody();
    }
    
    render() {
        const { Component, pageProps, apolloClient } = this.props;
        
        return (

            <Container>
                <Head>
                    <title>Kasper Koman</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
            
                <Navbar />
                
                <main className="main container is-fluid">
                    <ApolloProvider client={apolloClient}>
                        <Component {...pageProps} />
                    </ApolloProvider>
                </main>
            
            </Container>
        )
    }
}
export default withApolloClient(MyApp);