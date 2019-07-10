import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import ReleasesProvider, { ReleasesConsumer } from '../components/ReleasesProvider'
import ReleaseCoverList from '../components/ReleaseCoverList'

const left = (
    <div className="columns is-marginless">
        <div className="column is-8-mobile is-offset-2-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop has-no-vertical-padding">
            <ReleasesConsumer>
                {({ releases }) => (
                    <ReleaseCoverList releases={releases} className="center-first-item" />
                )}
            </ReleasesConsumer>
        </div>
    </div>
)

const right = (
    <Center className="has-text-centered">
        <ReleasesConsumer>
            {({ releases }) => (
                <div className="content">
                    { JSON.stringify(releases, null, 2) }
                </div>
            )}
        </ReleasesConsumer>
    </Center>
)

const Releases = props => (
    <ReleasesProvider>
        <TwoColumns left={left} right={right} />
    </ReleasesProvider>
)

Releases.getInitialProps = async function() {
    return { theme: 'dark' }
}

export default Releases