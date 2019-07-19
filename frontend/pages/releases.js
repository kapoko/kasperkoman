import { useState } from 'react'
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group'
import { isEmpty } from 'lodash'

import TwoColumns from '../components/TwoColumns'
import Center from '../components/Center'
import ReleasesProvider, { ReleasesConsumer } from '../components/ReleasesProvider'
import ReleaseCoverList from '../components/ReleaseCoverList'
import ReleaseInfo from '../components/ReleaseInfo'

const left = (
    <div className="columns is-marginless">
        <div className="column is-8-mobile is-offset-2-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop has-no-vertical-padding">
            <ReleasesConsumer>
                {({ releases, activeRelease, setActiveRelease }) => (
                    <ReleaseCoverList 
                        releases={releases} 
                        activeRelease={activeRelease}
                        setActiveRelease={setActiveRelease} 
                        className="center-first-item" 
                    />
                )}
            </ReleasesConsumer>
        </div>
    </div>
)

const right = () => {

    return (
        <Center fixed className="content">
            <ReleasesConsumer>
                {({ activeRelease }) => (                
                    <>
                        { !isEmpty(activeRelease) &&
                            <SwitchTransition>
                                <CSSTransition key={activeRelease._id} timeout={300} classNames="release-info">
                                    <ReleaseInfo release={activeRelease}/>
                                </CSSTransition>
                            </SwitchTransition>
                        }
                    </>
                )}
            </ReleasesConsumer>
        </Center>
    )
}

const Releases = props => (
    <ReleasesProvider>
        <TwoColumns left={left} right={right()} />
    </ReleasesProvider>
)

Releases.getInitialProps = async ({ req }) => {
    return { theme: 'dark' }
}

export default Releases