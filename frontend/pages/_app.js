import App, { Container } from 'next/app';
import Head from "next/head";
import svg4everybody from 'svg4everybody'

// import withData from "../lib/apollo";
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

import Fonts from '../components/Fonts'
import Navbar from '../components/Navbar';
// import ThemeProvider from '../components/ThemeProvider';
// import { ThemeConsumer } from '../components/ThemeProvider';

import { ThemeProvider } from 'styled-components';

// Extract our Sass variables into a JS object
// const theme = "styles";
// import theme from "sass-extract-loader";
// console.log(theme);
import '../styles/main.scss'

// const themes = {
//     light: require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/light.scss'),
//     dark: require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/dark.scss')
// }

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

                {/* <ThemeProvider theme={themes.light}>  */}
                    <div className={`theme ${pageProps.theme}`}>
                        <Navbar />

                        <ApolloProvider client={apolloClient}>
                            {/* <main className="main container is-fluid"> */}
                            <main className="main container is-fluid">
                                <Component {...pageProps} />
                            </main>
                        </ApolloProvider>
                        {/* <style jsx>{`${dark}`}</style> */}
                    </div>
                {/* </ThemeProvider> */}
            </Container>
        )
    }
}
export default withApolloClient(MyApp);