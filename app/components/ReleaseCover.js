import React, { Component } from 'react';
import getConfig from 'next/config';
import { Waypoint } from 'react-waypoint';
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
        const { release, isActive } = this.props;

        return (
            <Waypoint onEnter={this._handleWaypointEnter} topOffset="49%" bottomOffset="49%">
                <li className={isActive ? 'is-active' : ''}>
                    <div className="release-cover">
                        <Background src={ API_URL + release.cover.square } />
                    </div>
                    <ReleaseInfo className="is-hidden-tablet content" release={release}/>
                </li>
            </Waypoint>
        )
    }
}
