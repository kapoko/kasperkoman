export default ({ children, className, fixed, ...rest }) => (
    <div className={`center-content ${className ? className : ''} ${fixed ? 'is-fixed' : ''}`} {...rest}>
        { children }
    </div>
)