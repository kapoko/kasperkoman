

import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import Footer from '../components/Footer';

const left = (
    <Center className="has-text-centered content is-marginless">
        <h1>Privacy &amp; 🍪s</h1>
    </Center>
);
const right = (
    <Center className="has-text-centered content">
        <h6>Privacy &amp; Cookies</h6>
        <p> 
            I only use Google Analytics to track the usage of this site, which stores some analytical cookies. 
        </p>
        <p>
            I never store any personal data.
        </p>
        <p>
            Hope that's cool with you.
        </p>
        <Footer />
    </Center>
);

const Privacy = props => (
    <TwoColumns left={left} right={right} />
)

Privacy.getInitialProps = async function () {
    return { theme: 'light' }
}

export default Privacy