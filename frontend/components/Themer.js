import { useState, useEffect } from 'react';

const Themer = ({className, children, timeout, skipInitialTransition}) => {
    const [delayedClassName, setDelayedClassName] = useState(className);
    const [skipped, setSkipped] = useState(false);

    useEffect(() => {
        // Skip first
        if (!skipped && skipInitialTransition) {
            setSkipped(true);
            return;
        }

        setDelayedClassName(`${delayedClassName.replace(' done','')} to-${className}`)

        let timer = setTimeout(() => {
            setDelayedClassName(`${className} done`);
        }, timeout);

        return function cleanup() {
            clearTimeout(timer);
        }
    }, [className]); // Only re-run the effect if count changes

    return (
        <div className={`theme ${delayedClassName}`}>
            {children}
        </div>
    )
}
export default Themer