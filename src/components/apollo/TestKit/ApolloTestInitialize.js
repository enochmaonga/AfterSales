import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";

export const staticFooter = makeVar(true);

export const showFooter = makeVar(true);

export const showHeader = makeVar(true);

const httpLink = createHttpLink({
  uri: "http://10.184.46.17:5022/graphql",
  credentials: "include",
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        staticFooter: {
          read() {
            return staticFooter();
          },
        },
        showHeader: {
          read() {
            return showHeader();
          },
        },
        showFooter: {
          read() {
            return showFooter();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers: {},
  connectToDevTools: process.env.REACT_APP_APOLLO_ENVIRONMENT !== "production",
});

export default client;
