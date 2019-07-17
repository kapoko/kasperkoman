import React from 'react';
import nanoid from 'nanoid';

import SplitText from './SplitText';

const Title = React.memo(({ title, subtitle, ...rest }) => {
    const arr = title.split('/');
    const numParts = arr.length;

    return (
        <h1 {...rest}>
            <SplitText>
                { arr.map((part, i) => {
                    if (numParts === i + 1) {
                        // Last item
                        return part;
                    }
                
                    return ([part, <span key={nanoid()} className="separator">/</span>]);
                })}
                {subtitle && (
                    <span className="sub"><br/>{subtitle}</span>
                )}
            </SplitText>
        </h1>
    )
});
export default Title