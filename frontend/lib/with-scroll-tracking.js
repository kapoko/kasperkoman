import React from 'react';
import ReactDom from 'react-dom';
import { PropTypes } from 'prop-types';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
// import getScrollElement from '../utils/get-scroll-element';

const getScrollX = () => typeof window === 'undefined' ? 0 : (window.scrollX || window.pageXOffset);
const getScrollY = () => typeof window === 'undefined' ? 0 : (window.scrollY || window.pageYOffset);

const isIntersectionObserverAvailable = () => {
    return (
        typeof window !== 'undefined' &&
        'IntersectionObserver' in window &&
        'isIntersecting' in window.IntersectionObserverEntry.prototype
    );
}

const style = (element, prop) =>
  typeof getComputedStyle === 'undefined' ? element.style[prop] :
    getComputedStyle(element, null).getPropertyValue(prop);

const overflow = (element) =>
  style(element, 'overflow') +
  style(element, 'overflow-y') +
  style(element, 'overflow-x');

const getScrollElement = (element) => {
  if (!(element instanceof HTMLElement)) {
    return window;
  }

  let parent = element;

  while (parent) {
    if (parent === document.body ||
        parent === document.documentElement ||
        !parent.parentNode) {
      break;
    }

    if (/(scroll|auto)/.test(overflow(parent))) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return window;
};

const trackWindowScroll = (BaseComponent) => {
    class ScrollAwareComponent extends React.Component {
        constructor(props) {
            super(props);
            
            if (isIntersectionObserverAvailable()) {
                return;
            }
            
            const onChangeScroll = this.onChangeScroll.bind(this);
            
            if (props.delayMethod === 'debounce') {
                this.delayedScroll = debounce(onChangeScroll, props.delayTime);
            } else if (props.delayMethod === 'throttle') {
                this.delayedScroll = throttle(onChangeScroll, props.delayTime);
            }
            
            this.state = {
                scrollPosition: {
                    x: getScrollX(),
                    y: getScrollY(),
                },
            };
            
            this.baseComponentRef = React.createRef();
        }
        
        componentDidMount() {
            this.addListeners();
        }
        
        componentWillUnmount() {
            this.removeListeners();
        }
        
        componentDidUpdate() {
            if (typeof window === 'undefined' || isIntersectionObserverAvailable()) {
                return;
            }
            
            const scrollElement = getScrollElement(
                ReactDom.findDOMNode(this.baseComponentRef.current)
            );
                
            if (scrollElement !== this.scrollElement) {
                this.removeListeners();
                this.addListeners();
            }
        }
            
        addListeners() {
            if (typeof window === 'undefined' || isIntersectionObserverAvailable()) {
                return;
            }
            
            this.scrollElement = getScrollElement(
                ReactDom.findDOMNode(this.baseComponentRef.current)
            );
                
            this.scrollElement.addEventListener(
                'scroll',
                this.delayedScroll,
                { passive: true }
            );

            window.addEventListener(
                'resize',
                this.delayedScroll,
                { passive: true }
            );
                
            if (this.scrollElement !== window) {
                window.addEventListener(
                    'scroll',
                    this.delayedScroll,
                    { passive: true }
                );
            }
        }
                
        removeListeners() {
            if (typeof window == 'undefined' || isIntersectionObserverAvailable()) {
                return;
            }
            
            this.scrollElement.removeEventListener('scroll', this.delayedScroll);
            window.removeEventListener('resize', this.delayedScroll);
            
            if (this.scrollElement !== window) {
                window.removeEventListener('scroll', this.delayedScroll);
            }
        }
                        
        onChangeScroll() {
            if (isIntersectionObserverAvailable()) {
                return;
            }
            
            this.setState({
                scrollPosition: {
                    x: getScrollX(),
                    y: getScrollY(),
                },
            });

            console.log(this.state.scrollPosition.y);
        }
                        
        render() {
            const { delayMethod, delayTime, ...props } = this.props;
            const scrollPosition = isIntersectionObserverAvailable() ?
            null : this.state.scrollPosition;
            
            return (
                <BaseComponent
                ref={this.baseComponentRef}
                scrollPosition={scrollPosition}
                {...props} />
                );
            }
        }
        
        ScrollAwareComponent.propTypes = {
            delayMethod: PropTypes.oneOf(['debounce', 'throttle']),
            delayTime: PropTypes.number,
        };
        
        ScrollAwareComponent.defaultProps = {
            delayMethod: 'throttle',
            delayTime: 300,
        };
        
        return ScrollAwareComponent;
    };
    
export default trackWindowScroll;