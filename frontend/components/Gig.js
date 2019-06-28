import FormattedDate from './FormattedDate';

export default ({ gig }) => (
    <li>
        <FormattedDate isoDate={ gig.date } /> { gig.title } { gig.venue ? '@ ' + gig.venue : null } <span className="separator">|</span> { gig.city }, { gig.countryCode }
    </li>
)