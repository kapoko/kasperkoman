import React from "react";

const FormattedDate = React.memo(({ isoDate }) => {
    const date = new Date(isoDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return ( month + '/' + day );
});
export default FormattedDate