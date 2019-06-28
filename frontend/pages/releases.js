import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';

export default () => {
    const left = (<p>Index left</p>)
    const right = (
        <Center className="has-text-centered">
            <p>Releases right</p>
        </Center>
    );
    return (
        <TwoColumns left={left} right={right} />
    )
}