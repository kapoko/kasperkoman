import React from 'react';

import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import BackgroundWebp from '../components/BackgroundWebp';
import GigList from '../components/GigList';
import SocialLinks from '../components/SocialLinks';

const left = (
    <BackgroundWebp 
        src={require('../static/images/background_home.jpg?webp')} 
        fallback={require('../static/images/background_home.jpg')} />
)

const right = (
    <>
        <Center>
            <GigList />
            <SocialLinks className="nav-bottom"/>
        </Center>
    </>
)

const Index = props => (
    <TwoColumns left={left} right={right} />
)

Index.getInitialProps = async function () {
    return { theme: 'light', title: 'Official Home' }
}

export default Index