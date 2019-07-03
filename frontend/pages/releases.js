import React, { Component } from 'react'
import Head from "next/head";

import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import { ReleasesConsumer } from '../components/ReleasesProvider'
import ReleasesProvider from '../components/ReleasesProvider'
import ReleaseCover from '../components/ReleaseCover';
import Navbar from '../components/Navbar';

import styled, { withTheme, ThemeProvider } from 'styled-components';

// import dark from '../styles/dark.scss


const Title = styled.h1`
    font-size: 5em;
    color: $danger;
`;

class releases extends React.Component {

    static async getInitialProps() {
        // console.log('jaajajajajja', themes);
        return { theme: 'dark' }
    }

    render() {
        const left = (
            <ReleasesConsumer>
                {({ releases }) => (
                    <div className="columns is-marginless">
                        <div className="column is-8-mobile is-offset-2-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop has-no-vertical-padding">
                            {/* <Title>Jajaja</Title> */}
                            <ul className="center-first-item">
                                { releases && releases.map(release => {
                                    return (
                                        <li key={ release._id } className="release-cover">
                                            <ReleaseCover release={ release }></ReleaseCover>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                )}
            </ReleasesConsumer>
        )
    
        const right = (
            <Center className="has-text-centered">
                <ReleasesConsumer>
                    {({ releases }) => (
                        <div>
                            { JSON.stringify(releases, null, 2) }
                        </div>
                    )}
                </ReleasesConsumer>
            </Center>
        )

        return (
            <>
                <Head>
                    <title>Kasper Koman | Releases</title>
                </Head>
                <ReleasesProvider>
                    {/* <style jsx global>{`
                        html, body {
                            background-color: #262624;
                            color: #fff;
                        }

                        .logo {
                            fill: #373735;
                        }

                        main.main > .columns > .column:nth-child(1) {
                            background: #191919;
                        }
                    `}</style> */}
                      {/* <style jsx>{`${dark}`}</style> */}
                    <TwoColumns left={left} right={right} />
                </ReleasesProvider>
            </>
        )
    }
}
export default withTheme(releases)