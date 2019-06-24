import TwoColumnLayout from '../components/TwoColumnLayout';
import Background from '../components/Background'; 

export default () => {

    const left = (<Background src='/static/background_2.jpg' />)
    const right = (<p>This is a right paragraph</p>)

    return (
        <TwoColumnLayout left={left} right={right} />
    )
}