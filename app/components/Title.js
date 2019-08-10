import React from 'react';
import nanoid from 'nanoid';

import SplitText from './SplitText';

const Title = React.memo(({ title, subtitle, animate, ...rest }) => {
    const arr = title.split('/');
    const numParts = arr.length;

    const rendered = {
        title: arr.map((part, i) => {
            if (numParts === i + 1) {
                // Last item
                return part;
            }
        
            return ([part, <span key={nanoid()} className="separator">/</span>]);
        }),
        subtitle: subtitle && (
            <span className="sub"><br/>{subtitle}</span>
        )
    }

    if (animate) {
        return (
            <h1 {...rest}>
                <SplitText>
                    { rendered.title } 
                    { rendered.subtitle } 
                </SplitText>
            </h1>
        )
    }

    return (
        <h1 {...rest}>
            { rendered.title } 
            { rendered.subtitle } 
        </h1>
    )
});
export default Title