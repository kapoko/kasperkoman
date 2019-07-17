import react from 'react';

const renderChildren = (child, charCount = 0) => {
    switch(typeof child) {
        case 'string':
            return ( 
                // Arrived at a string (maximun depth). Split and render per word and character
                child.split(' ').map((word, i) => (
                    <span key={word + i} className='word'>
                        { word.split('').map((char, i) => (
                            <span key={char + i} className="char-container">
                                <span className={`char d-${charCount++}`}>{char == ' ' ? '\u00A0' : char}</span>
                            </span>
                        ))}
                    </span>
                ))
            )
        case 'object':
            // If currect object is a react component, recursively render its children 
            if (React.isValidElement(child)) {
                return React.cloneElement(child, [], renderChildren(child.props.children, charCount));
            } 
            
            // Current object is a JSX array, recursively render children for each of its components
            return (
                React.Children.map(child, c => {
                    let children = renderChildren(c, charCount);
                    charCount += (typeof c === 'string' ? c.length : 1);
                    return children;
                })
            )
    }
}

const SplitText = React.memo(({children}) => {
    return renderChildren(children);
});
export default SplitText