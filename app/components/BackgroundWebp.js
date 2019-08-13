import Background from './Background';
import { WebpSupportConsumer } from './WebpSupportProvider';

const BackgroundWebp = (props) => {
    const { src, fallback, ...rest } = props;

    return (
        <WebpSupportConsumer>
            {({ webpSupport }) => {
                // Wait for webpSupport to become true or false
                if (webpSupport === null) return; 
                return ( <Background src={(webpSupport) ? src : fallback } {...rest}/> );
            }}
        </WebpSupportConsumer>
    )
}

export default BackgroundWebp; 