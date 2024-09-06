import { ApolloClient, InMemoryCache } from '@apollo/client'

const API = process.env['NEXT_PUBLIC_VSC_NODE_URL'] || 'https://api.vsc.eco'

export const client = new ApolloClient({
  uri: API + '/api/v1/graphql',
  cache: new InMemoryCache(),
})
