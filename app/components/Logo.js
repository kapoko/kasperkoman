const Logo = ({className}) => (
    <div className={`logo ${className}`}>
        <svg role="img">
            <use xlinkHref="static/images/logo.svg#left"/>
        </svg>
        <svg role="img">
            <use xlinkHref="static/images/logo.svg#right"/>
        </svg>
    </div>
)
export default Logo