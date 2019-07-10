import App, { Container } from 'next/app';
import Head from "next/head";
import svg4everybody from 'svg4everybody'

// import withData from "../lib/apollo";
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

import Fonts from '../components/Fonts'
import Navbar from '../components/Navbar';

import '../styles/main.scss'

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
                </Head>

                <div className={`theme ${pageProps.theme}`}>
                    <Navbar />

                    <ApolloProvider client={apolloClient}>
                        {/* <main className="main container is-fluid"> */}
                        <main className="main container is-fluid">
                            <Component {...pageProps} />
                        </main>
                    </ApolloProvider>
                </div>
            </Container>
        )
    }
}
export default withApolloClient(MyApp);