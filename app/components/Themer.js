import { useState, useEffect } from 'react';
import { defer } from 'lodash';
 
const Themer = ({className, children, timeout, skipInitialTransition}) => {
    const [delayedClassName, setDelayedClassName] = useState(className);
    const [skipped, setSkipped] = useState(false);

    useEffect(() => {
        // Skip first
        if (skipInitialTransition && !skipped) {
            setSkipped(true);
            return;
        }
        
        setDelayedClassName(`${delayedClassName ? delayedClassName.replace(' done','') : ''}`)
        defer(() => {
            setDelayedClassName(`${delayedClassName ? delayedClassName.replace(' done','') : ''} to-${className}`)
        });

        let timer = setTimeout(() => {
            setDelayedClassName(`${className} done`);
        }, timeout);

        return function cleanup() {
            clearTimeout(timer);
        }
    }, [children]);

    return (
        <div className={`theme ${delayedClassName}`}>
            {children}
        </div>
    )
}
export default Themer