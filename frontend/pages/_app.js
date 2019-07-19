import App, { Container } from 'next/app';
import Head from "next/head";
import { PageTransition } from 'next-page-transitions'
import svg4everybody from 'svg4everybody'
import nanoid from 'nanoid';

import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

import Fonts from '../components/Fonts'
import Navbar from '../components/Navbar';
import TransitionBlocks from '../components/TransitionBlocks';
import Logo from '../components/Logo';
import Themer from '../components/Themer';

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
        const transitionSpeed = 800;

        return (
            <Container>
                <Head>
                    <title>Kasper Koman</title>
                </Head>

                <Themer timeout={transitionSpeed} className={pageProps.theme} skipInitialTransition>

                    <Navbar />
                    <Logo className="is-hidden-mobile" />
                    
                    <PageTransition timeout={transitionSpeed} classNames={`transition-${pageProps.theme}`} skipInitialTransition>
                        <ApolloProvider key={nanoid()} client={apolloClient}>
                            <main className="main container is-fluid">
                                <Component {...pageProps} />
                            </main>
                            <TransitionBlocks />
                        </ApolloProvider>
                    </PageTransition>

                </Themer>
            </Container>
        )
    }
}
export default withApolloClient(MyApp);