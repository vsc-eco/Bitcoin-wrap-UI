import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://api.vsc.eco/api/v1/graphql',
  cache: new InMemoryCache(),
})
