import TwoColumnLayout from '../components/TwoColumnLayout';

export default () => {
    const left = (<p>Bookings left</p>)
    const right = (<p>bookings rightttt</p>)

    return (
        <TwoColumnLayout left={left} right={right} />
    )
}