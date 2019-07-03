import React, { Component } from 'react'
import Head from "next/head";

import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import { ReleasesConsumer } from '../components/ReleasesProvider'
import ReleasesProvider from '../components/ReleasesProvider'
import ReleaseCover from '../components/ReleaseCover';
import Background from '../components/Background';
import GigList from '../components/GigList';
import Navbar from '../components/Navbar';

import styled, { withTheme, ThemeProvider } from 'styled-components';

// import light from '../styles/light.scss'

const Title = styled.h1`
    font-size: 5em;
    color: $danger;
`;

// const themeLight = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/light.scss');
// const themeDark = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/dark.scss');

export default class index extends React.Component {

    static async getInitialProps() {
        // console.log('jaajajajajja', themes);
        return { theme: 'light' }
    }

    render() {
        // console.log('Current theme: ', this.props.theme);    console.log('Current theme: ', this.props.theme);

        const left = (
            <Background src='/static/background.jpg' />
        )
        const right = (
            <Center className="has-text-centered">
                <GigList />
            </Center>
        )

        return (
            <>
                <Head>
                    <title>Kasper Koman</title>
                </Head>
                
                <TwoColumns left={left} right={right} />
                {/* <style jsx>{`${light}`}</style> */}
            </>
        )
    }
}
// export default withTheme(index);