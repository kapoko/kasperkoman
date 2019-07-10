import React, { Component } from 'react'

import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import { ReleasesConsumer } from '../components/ReleasesProvider'
import ReleasesProvider from '../components/ReleasesProvider'
import Background from '../components/Background';
import GigList from '../components/GigList';
import Navbar from '../components/Navbar';

import styled, { withTheme, ThemeProvider } from 'styled-components';

// import light from '../styles/light.scss'

// const Title = styled.h1`
//     font-size: 5em;
//     color: $danger;
// `;

// const themeLight = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/light.scss');
// const themeDark = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/dark.scss');

const left = (
    <Background src='/static/background.jpg' />
)

const right = (
    <Center className="has-text-centered">
        <GigList />
    </Center>
)

const Index = props => (
    <TwoColumns left={left} right={right} />
)

Index.getInitialProps = async function () {
    return { theme: 'light' }
}

export default Index