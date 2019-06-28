import TwoColumnLayout from '../components/TwoColumnLayout';
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
        <TwoColumnLayout left={left} right={right} />
    )
}