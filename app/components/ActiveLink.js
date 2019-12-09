import { withRouter } from 'next/router'

const ActiveLink = ({ children, router, href }) => {
    const handleClick = e => {
        e.preventDefault()
        router.push(href)
    }

    return router && 
        <a href={href} className={router.pathname === href ? 'is-active' : ''} onClick={handleClick}>
            {children}
        </a>
}

export default withRouter(ActiveLink)