import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';

const left = (
    <Center className="has-text-centered">
        <p>Bookings</p>
    </Center>
)

const right = (
    <Center className="has-text-centered">
        <p>Bookings</p>
    </Center>
)

const Bookings = props => (
    <TwoColumns left={left} right={right} />
)

Bookings.getInitialProps = async function () {
    return { theme: 'light' }
}

export default Bookings