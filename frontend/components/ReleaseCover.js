import getConfig from 'next/config'
const { API_URL } = getConfig().publicRuntimeConfig

export default ({ release }) => {
    return (
        <img src={ API_URL + release.cover.square } alt=""/>
    )
}