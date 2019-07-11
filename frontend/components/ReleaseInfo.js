import ReleaseDate from './ReleaseDate'
import Title from './Title'
import ReleaseLinks from './ReleaseLinks'

const ReleaseInfo = ({ release }) => {
    const { releaseDate, title, subtitle, label, links } = release;

    return (
        <div className='release-info'>
            <ReleaseDate isoDate={releaseDate} />
            <Title className="title" title={title} />
            <h2 className="subtitle">{subtitle}</h2>
            <p className="label">{label}</p>
            <ReleaseLinks links={links} />
        </div>
    )
};
export default ReleaseInfo