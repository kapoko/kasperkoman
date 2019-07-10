import { Component } from 'react';

import ReleaseCover from './ReleaseCover';

class ReleaseCovers extends Component {

    constructor(props) {
        super(props);
        this._onCoverEnter = this._onCoverEnter.bind(this);
    }

    _onCoverEnter(coverIndex) {
        this.props.setActiveRelease(coverIndex);
    }

    render() {
        const {className, releases, activeRelease} = this.props;

        return (
            <ul className={className}>
                {releases && releases.map((release, index) => (
                    <ReleaseCover key={release._id} release={release} 
                        index={index}
                        onEnter={this._onCoverEnter}
                        isActive={activeRelease == index} />
                ))}
            </ul>
        )
    }
}

export default ReleaseCovers