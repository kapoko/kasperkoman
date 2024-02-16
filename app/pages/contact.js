import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import BackgroundWebp from '../components/BackgroundWebp';
import Footer from '../components/Footer';

const left = (
    <BackgroundWebp 
        src={require('../static/images/background_contact.jpg?webp')} 
        fallback={require('../static/images/background_contact.jpg')} />
)

const right = (
    <Center className="has-text-centered content">
        <h6>Bookings / Other</h6>
        <p>
            Worldwide <span className="separator">|</span> Jonan Kouwenhoven<br/>
            <a href="mailto:jonan@unifybookings.com">jonan@unifybookings.com</a>
        </p>
        <h6>Promos</h6>
        <p>
            <a href="mailto:promos@kasperkoman.com">promos@kasperkoman.com</a>
        </p>
        <Footer />
    </Center>
)

const Contact = () => (
    <TwoColumns left={left} right={right} />
)

Contact.getInitialProps = async function () {
    return { theme: 'light', title: 'Contact' }
}

export default Contact