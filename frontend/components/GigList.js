import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Date from './Date'

const GigList = (
    { data: { loading, error, gigs } },
    req
) => {
    if (error) return "Couldn't retrieve gigs";
         
    if (gigs && gigs.length) {
        return (
            <ul>
                { gigs.map(gig => {
                    return (
                        <li key={ gig._id }>
                            <Date isoDate={gig.date} /> { gig.title } <span className="separator">|</span> { gig.city }, { gig.countryCode }
                        </li>
                    )
                })}
            </ul>
        )
    } else {
        return null;
    }
}
    
const query = gql`
{
    gigs ( sort: "date:asc" ){
        _id
        title
        date,
        city,
        countryCode,
        ticketUrl
    }
}
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)
export default graphql(query, {
    props: ({ data }) => ({
        data
    })
})(GigList);