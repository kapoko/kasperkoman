import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';

export default () => {
    const left = (
        <Center className="has-text-centered content is-marginless">
            <h1>404</h1>
        </Center>
    );
    const right = (
        <Center className="has-text-centered">
            <p>Sad it's not 808 or 909.</p>
        </Center>
    );


    return (
        <TwoColumns left={left} right={right} />
    )
}