import Link from "next/link";
import { withRouter } from "next/router";
import { Children } from "react";
import React from "react";

const NavbarItem = ({router, children, as, href, ...rest}) => (
    <div className={`navbar-item ${(router.asPath === href || router.asPath === as) ? 'is-active' : null}`} {...rest}>
        <Link href={href} as={as}>
            {React.cloneElement(Children.only(children))}
        </Link>
    </div>
);
export default withRouter(NavbarItem);