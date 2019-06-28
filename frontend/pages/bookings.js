import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';

export default () => {
    const left = (<p>Bookings left</p>)
    const right = (
        <Center className="has-text-centered">
            <p>Bookings right</p>
        </Center>
    );


    return (
        <TwoColumns left={left} right={right} />
    )
}