export default ({ children, className, ...rest }) => (
    <div className={`center-content ${className}`} {...rest}>
        { children }
    </div>
)