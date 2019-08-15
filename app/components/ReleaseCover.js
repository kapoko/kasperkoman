import React from 'react';
import { Waypoint } from 'react-waypoint';
import getConfig from 'next/config';
const { API_URL } = getConfig().publicRuntimeConfig;

import Background from './Background';
import ReleaseInfo from './ReleaseInfo';

export default class ReleaseCover extends React.Component {

    constructor(props) {
        super(props);
        this._handleWaypointEnter = this._handleWaypointEnter.bind(this);
    }

    _handleWaypointEnter() {
        this.props.onEnter(this.props.index);
    }

    render() {
        const { release, load, isActive } = this.props;

        return (
            <Waypoint onEnter={this._handleWaypointEnter} topOffset="49%" bottomOffset="49%">
                <li className={isActive ? 'is-active' : ''}>
                    <div className="release-cover">
                        <Background load={load} src={ API_URL + release.cover.square } />
                    </div>
                    <ReleaseInfo className="is-hidden-tablet content" release={release} animate={false}/>
                </li>
            </Waypoint>
        )
    }
}
