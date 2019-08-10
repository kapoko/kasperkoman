const Logo = ({className}) => (
    <div className={`logo ${className}`}>
        <svg role="img">
            <use xlinkHref="static/logo.svg#left"/>
        </svg>
        <svg role="img">
            <use xlinkHref="static/logo.svg#right"/>
        </svg>
    </div>
)
export default Logo