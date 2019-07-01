import FormattedDate from './FormattedDate';

export default ({ gig, hasInfoButton = false }) => {

    const gigComponent = (
        <>
            <FormattedDate isoDate={ gig.date } /> { gig.title }{ gig.venue ? '@ ' + gig.venue : null }
            <span className="separator"> | </span> 
            { gig.city }, { gig.countryCode }
            {/* { hasInfoButton && gig.url && (
                <button class="button-kk from-bottom">Info</button>
            )} */}
        </>
    );

    if (hasInfoButton && gig.url) {
        return (
            <li>
                <a href={ gig.url } target="_blank" >
                    { gigComponent }
                </a>
            </li>
        )
    }
        
    return ( 
        <li>
            { gigComponent }
        </li> 
    )
}