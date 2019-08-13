import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { groupBy } from "lodash";

import Gig from './Gig';

/**
 * Splits gigs into upcoming and past gigs
 * 
 * @param {array} gigs 
 */
const sortGigs = (gigs) => {
    // Split gigs in past & upcoming
    let now = new Date().toISOString();

    let grouped = groupBy(gigs, (gig) => {
        return (gig.date > now);
    });

    // Reverse upcoming gigs if any to show closest first
    if (grouped.true) {
        grouped.true = grouped.true.reverse();   
    }

    return { upcoming: grouped.true, past: grouped.false }
}

const query = gql`
{
    gigs (limit:10, sort:"date:desc"){
        _id
        title
        date,
        city,
        countryCode,
        url,
        venue
    }
}
`;

const GigList = ({ data: { loading, error, gigs } }, req) => {
    if (error) {
        console.error(error);
        return "Couldn't retrieve gigs";
    }
         
    if (!gigs || !gigs.length) {
        return null;
    }

    gigs = sortGigs(gigs);
    
    return (
        <div className="gig-list content">
            <ul>
                {gigs.upcoming && gigs.upcoming.map(gig => (
                    <Gig key={ gig._id } gig={ gig } hasInfoButton />
                ))}
            </ul>
            {gigs.past && (
                <>
                    <h6>Past</h6>
                    <ul className="past">
                        { gigs.past.map(gig => {
                            return (
                                <Gig key={ gig._id } gig={ gig } />
                            )
                        })}
                    </ul>
                </>
            )}
        </div>
    )
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component
export default graphql(query, {
    props: ({ data }) => ({
        data
    })
})(GigList);