import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// export const retryLink = new RetryLink({
//     delay: {
//         initial: 300,
//         max: Infinity,
//         jitter: true
//     },
//     attempts: {
//         max: 5,
//         // eslint-disable-next-line no-unused-vars
//         retryIf: (error, _operation) => !!error
//     }
// });

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_APOLLO_CLIENT_HTTP_LINK_URI_TWO,
  credentials: "include",
});
export const headerEnrichmentClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  resolvers: {},
});

export const HeMessage = "";
