import TwoColumnLayout from '../components/TwoColumnLayout';

export default () => {
    const left = (<p>Index left</p>)
    const right = (<p>index right</p>)

    return (
        <TwoColumnLayout left={left} right={right} />
    )
}