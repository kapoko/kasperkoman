import React, { Component } from 'react'

import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import { ReleasesConsumer } from '../components/ReleasesProvider'
import ReleasesProvider from '../components/ReleasesProvider'
import ReleaseCover from '../components/ReleaseCover';

export default class releases extends Component {    
    render() {

        const left = (
            <ReleasesConsumer>
                {({ releases }) => (
                    <div className="columns is-marginless">
                        <div className="column is-8-mobile is-offset-2-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop has-no-vertical-padding">
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
                <p>Releases right</p>
                <ReleasesConsumer>
                    {({ releases }) => (
                        <>
                            { JSON.stringify(releases, null, 2) }
                        </>
                    )}
                </ReleasesConsumer>
            </Center>
        )

        return (
            <ReleasesProvider>
                <style jsx global>{`
                    html, body {
                        background-color: #262624;
                        color: #fff;
                    }

                    .logo {
                        fill: #373735;
                    }
                `}</style>
                <TwoColumns left={left} right={right} />
            </ReleasesProvider>
        )
    }
}