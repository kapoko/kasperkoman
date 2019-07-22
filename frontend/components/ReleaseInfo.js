import React, { useState, useEffect } from 'react';

import ReleaseDate from './ReleaseDate'
import Title from './Title'
import ReleaseLinks from './ReleaseLinks'

const ReleaseInfo = React.memo(({ release, className, animate }) => {
    const { releaseDate, title, subtitle, label, links } = release;

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setIsActive(true);
        }, 250);

        return function cleanup() {
            clearTimeout(timeout);
        }
    }, []);

    return (
        <div className={className}>
            <div className={`release-info ${isActive ? 'is-active' : ''}`}>
                <ReleaseDate isoDate={releaseDate} />
                <Title className="title" title={title} subtitle={subtitle} animate={animate}/>
                <p className="label">{label}</p>
                <ReleaseLinks links={links} />
            </div>
        </div>
    )

});
export default ReleaseInfo