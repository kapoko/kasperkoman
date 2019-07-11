import React from 'react';
import nanoid from 'nanoid';

const Title = React.memo(({ title, ...rest }) => {
    const converted = title.replace('/', '<span>/</span>')
    const arr = title.split('/');
    const numParts = arr.length;

    return (
        <h1 {...rest}>
            { arr.map((part, i) => {
                if (numParts === i + 1) {
                    // Last item
                    return part;
                }
            
                return ([part, <span key={nanoid()}>/</span>]);
            })}
        </h1>
    )
});
export default Title