import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
const { API_URL } = getConfig().publicRuntimeConfig;
const { API_URL_SERVER } = getConfig().serverRuntimeConfig;

const prod = process.env.NODE_ENV === 'production'

let apolloClient = null

function create (initialState) {
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    const isBrowser = typeof window !== 'undefined'
    return new ApolloClient({
        connectToDevTools: isBrowser,
        ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
        link: new HttpLink({
            uri: ((isBrowser || !prod) ? API_URL : API_URL_SERVER) + '/graphql', // Server URL (must be absolute)
            credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
            // Use fetch() polyfill on the server
            fetch: !isBrowser && fetch
        }),
        cache: new InMemoryCache({
            addTypename: true
        }).restore(initialState || {})
    })
}

export default function initApollo (initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        return create(initialState)
    }
    
    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState)
    }
    
    return apolloClient
}