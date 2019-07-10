import TwoColumns from '../components/TwoColumns'
import Center from '../components/Center'
import ReleasesProvider, { ReleasesConsumer } from '../components/ReleasesProvider'
import ReleaseCoverList from '../components/ReleaseCoverList'
import ReleaseDate from '../components/ReleaseDate'
import Title from '../components/Title'
import ReleaseLinks from '../components/ReleaseLinks'

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

const right = (
    <Center fixed className="has-text-centered content">
        <ReleasesConsumer>
            {({ releases, activeRelease }) => {
                return releases && releases.map((release, index) => (
                    <div key={release._id} className={`release-info ${(activeRelease == index) ? 'is-active' : ''}`}>
                        <ReleaseDate isoDate={release.releaseDate} />
                        <Title className="title" title={release.title} />
                        <h2 className="subtitle">{release.subtitle}</h2>
                        <p className="label">{release.label}</p>
                        <ReleaseLinks links={release.links} />
                    </div>
                ));
            }}
        </ReleasesConsumer>
    </Center>
)

const Releases = props => (
    <ReleasesProvider>
        <TwoColumns left={left} right={right} />
    </ReleasesProvider>
)

Releases.getInitialProps = async ({ req }) => {
    return { theme: 'dark' }
}

export default Releases