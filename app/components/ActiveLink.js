import { withRouter } from 'next/router'

// typically you want to use `next/link` for this usecase
// but this example shows how you can also access the router
// using the withRouter utility.

const ActiveLink = ({ children, router, href }) => {
    const handleClick = e => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} className={router.pathname === href ? 'is-active' : ''} onClick={handleClick}>
            {children}
        </a>
    )
}

export default withRouter(ActiveLink)