import { Component } from 'react';

import ReleaseCover from './ReleaseCover';

class ReleaseCovers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeCoverIndex: null,
        };

        this._onCoverEnter = this._onCoverEnter.bind(this);
    }

    _onCoverEnter(coverIndex) {
        this.setState({
            activeCoverIndex: coverIndex
        })
    }

    render() {
        const {className, scrollPosition, releases, viewportHeight} = this.props;

        return (
            <ul className={className}>
                
                {releases && releases.map((release, index) => (
                    <ReleaseCover key={release._id} release={release} 
                        index={index}
                        scrollPosition={scrollPosition}
                        onEnter={this._onCoverEnter}
                        isActive={this.state.activeCoverIndex == index} />
                ))}
            </ul>
        )
    }
}

export default ReleaseCovers