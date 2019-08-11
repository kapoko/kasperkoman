import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import WebpBackground from '../components/Background';

const left = (
    <WebpBackground 
        src={require('../static/images/background_contact.jpg?webp')} 
        fallback={require('../static/images/background_contact.jpg')} />
)

const right = (
    <Center className="has-text-centered content">
        <h6>Bookings</h6>
        <p>
            Worldwide <span className="separator">|</span> Nick Crockett<br/>
            <a href="mailto:nick@manual-bookings.com">nick@manual-bookings.com</a>
        </p>
        <p>
            Netherlands <span className="separator">|</span> Noah van Putten<br/>
            <a href="mailto:nick@manual-bookings.com">noah@manual-bookings.com</a>
        </p>
    </Center>
)

const Contact = () => (
    <TwoColumns left={left} right={right} />
)

Contact.getInitialProps = async function () {
    return { theme: 'light', title: 'Contact' }
}

export default Contact