import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

import isIntersectionObserverAvailable from './util/intersection-observer';

const getScrollY = () => typeof window === 'undefined' ? 0 : (window.scrollY || window.pageYOffset);

const withScrollTracking = (WrappedComponent) => {
    return class ScrollTracker extends React.Component {

        state = {
            position: 0,
            viewportHeight: 0,
        }
    
        static displayName = 'withScrollTracking()';

        constructor(props) {
            super(props);

            if (typeof window === 'undefined') {
                return;
            }        

            const handleScroll = this.handleScroll.bind(this);
            const handleResize = this.handleResize.bind(this);
            this.throttledScroll = throttle(handleScroll, 100);
            this.debouncedResize = debounce(handleResize, 250);

            console.log(this.WrappedComponent);
            this.componentHandleScroll = WrappedComponent.prototype['handleScroll'].bind(this.WrappedComponent);
        }

        handleScroll(event) {
            let scrollTop = getScrollY();

            this.setState({
                position: scrollTop
            });

            this.componentHandleScroll(event);
        }

        handleResize() {
            this.setState({
                viewportHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
            });

            this.throttledScroll();
        }

        componentDidMount() {
            window.addEventListener('resize', this.throttledScroll);
            window.addEventListener('resize', this.debouncedResize);
            window.addEventListener('load', this.debouncedResize);
            window.addEventListener('scroll', this.throttledScroll);
        }
        
        componentWillUnmount() {
            window.removeEventListener('resize', this.throttledScroll);
            window.removeEventListener('resize', this.debouncedResize);
            window.removeEventListener('scroll', this.throttledScroll);
        }

        render() {
            const { ...props } = this.props;
            console.log(this.props);

            return <WrappedComponent viewportHeight={this.state.viewportHeight} scrollPosition={this.state.position} {...props} />
        }
    }
}
export default withScrollTracking