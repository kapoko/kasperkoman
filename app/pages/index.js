import React from 'react';

import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import WebpBackground from '../components/Background';
import GigList from '../components/GigList';

const left = (
    <WebpBackground 
        src={require('../static/images/background_home.jpg?webp')} 
        fallback={require('../static/images/background_home.jpg')} />
)

const right = (
    <Center>
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