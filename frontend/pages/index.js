import TwoColumns from '../components/TwoColumns';
import Center from '../components/Center';
import Background from '../components/Background';
import GigList from '../components/GigList';

const left = (
    <Background src='/static/background.jpg' />
)

const right = (
    <Center>
        <GigList />
    </Center>
)

const Index = props => (
    <TwoColumns left={left} right={right} />
)

Index.getInitialProps = async function () {
    return { theme: 'light' }
}

export default Index