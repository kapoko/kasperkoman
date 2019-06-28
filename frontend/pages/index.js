import TwoColumns from '../components/TwoColumns';
import Background from '../components/Background'; 
import GigList from '../components/GigList';
import Center from '../components/Center';

export default () => {

    const left = (<Background src='/static/background.jpg' />);
    const right = (
        <Center className="has-text-centered">
            <GigList />
        </Center>
    );

    return (
        <TwoColumns left={left} right={right} />
    )
}