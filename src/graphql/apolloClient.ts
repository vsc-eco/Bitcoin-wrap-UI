import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient  = new ApolloClient({
    uri: "https://my-endpoint.com",
    cache: new InMemoryCache(),
})

export default apolloClient;


