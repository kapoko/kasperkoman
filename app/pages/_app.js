import App, { Container } from 'next/app';
import Head from "next/head";
import { PageTransition } from 'next-page-transitions';
import svg4everybody from 'svg4everybody';
import nanoid from 'nanoid';

import withApolloClient from '../lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import WebpSupportProvider from '../components/WebpSupportProvider';

import Fonts from '../components/Fonts';
import Navbar from '../components/Navbar';
import TransitionBlocks from '../components/TransitionBlocks';
import Logo from '../components/Logo';
import Themer from '../components/Themer';

import getConfig from 'next/config';
const { APP_URL } = getConfig().publicRuntimeConfig;

import '../styles/main.scss'

class MyApp extends App {
    
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
                    <title>{`Kasper Koman${pageProps.title ? ' | ' + pageProps.title : ''}`}</title>

                    <meta property="og:title" content="Kasper Koman" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://kasperkoman.com" />
                    <meta property="og:description" content="Official home of Kasper Koman." />
                    <meta property="og:image" content={`${APP_URL}${require('../static/images/facebook_og.jpg')}`} />
                    <meta property="og:locale" content="en_GB" />
                    <meta property="og:image:type" content="image/jpeg" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta property="og:image:height" content="630" />
                    <meta property="fb:app_id" content="2461469057244161" />

                </Head>

                <Themer timeout={transitionSpeed} className={pageProps.theme} skipInitialTransition>

                    <Navbar />
                    <Logo className="is-hidden-mobile" />
                    
                    <PageTransition timeout={transitionSpeed} classNames={`transition-${pageProps.theme}`} skipInitialTransition>
                        <ApolloProvider key={nanoid()} client={apolloClient}>
                            <WebpSupportProvider>
                                <main className="main container is-fluid">
                                    <Component {...pageProps} />
                                </main>
                                <TransitionBlocks />
                            </WebpSupportProvider>
                        </ApolloProvider>
                    </PageTransition>

                </Themer>

            </Container>
        )
    }
}
export default withApolloClient(MyApp);