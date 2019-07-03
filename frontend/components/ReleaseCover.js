import getConfig from 'next/config'
import Background from './Background';

const { API_URL } = getConfig().publicRuntimeConfig

export default ({ release }) => {
    return (
        <Background src={ API_URL + release.cover.square } />
    )
}