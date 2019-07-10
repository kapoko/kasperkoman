import React from "react";
import ordinal from "ordinal";

const ReleaseDate = React.memo(({ isoDate }) => {
    const date = new Date(isoDate);
    const now = new Date();
    const isReleased = (date < now);

    const month = date.toLocaleDateString('en-US', { month: 'long'});
    const day = ordinal(date.getDate());
    const year = date.toLocaleDateString('en-US', { year: 'numeric'});

    return (
        <p className="is-uppercase">
            { isReleased ? 'Released' : 'Releasing'} {month} {day} {year}
        </p>
    )
});
export default ReleaseDate