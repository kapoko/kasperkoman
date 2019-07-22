import React from "react"

const ReleaseLinks = React.memo(({ links, ...rest }) => {

    const linkArr = links
        .split(/\n/)
        .filter(v => (v))
        .sort()
        .map(string => 
    {   
        // Split at :
        string = string.split(/:(.+)/);
        const url = string[1] ? string[1] : '#'

        return <a key={url} href={url} className="button" target="_blank">{string[0]}</a>;
    });

    return (
        <div className="links" {...rest}>
            <p>{linkArr}</p>
        </div>
    )
});
export default ReleaseLinks