import React from "react"
import { orderBy } from "lodash"

const ReleaseLinks = React.memo(({ links, ...rest }) => {

    const linkArr = links
        .split(/\n/)
        .filter(v => (v))
        .map(string => 
    {
        string = string.split(/:(.+)/);

        return {
            title: string[0],
            url: string[1] ? string[1] : '#'
        }
    });

    // Sort alphabetically
    const sortedArr = orderBy(linkArr, ['title'], ['asc']);

    return (
        <div className="links" {...rest}>
            { sortedArr && sortedArr.map(link => (
                <a href={link.url} className="button" target="_blank">{link.title}</a>
            ))}
        </div>
    )
});
export default ReleaseLinks