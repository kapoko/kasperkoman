import { Component } from 'react';

import ReleaseCover from './ReleaseCover';

class ReleaseCovers extends Component {

    constructor(props) {
        super(props);
        this._onCoverEnter = this._onCoverEnter.bind(this);
    }

    _onCoverEnter(coverIndex) {
        this.props.setActiveRelease(this.props.releases[coverIndex]);
    }

    render() {
        const {className, releases, activeRelease } = this.props;

        return (
            <ul className={className}>
                { releases && releases.map((release, index) => {

                    // Find distance of this release to the active release. If less than 1, preload image.
                    const distance = Math.abs(releases.findIndex(release => activeRelease && release._id == activeRelease._id) - index);
                    const preLoadImage = (distance <= 1);

                    return (
                        <ReleaseCover key={release._id} 
                            load={preLoadImage} 
                            release={release}
                            index={index}
                            onEnter={this._onCoverEnter}
                            isActive={activeRelease == release} />
                    )
                })}
            </ul>
        )
    }
}

export default ReleaseCovers