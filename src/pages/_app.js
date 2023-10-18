import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Create the Apollo Client and set the GraphQL endpoint to your server
const client = new ApolloClient({
  uri: 'http://localhost:4000', // Replace with your actual server URL
  cache: new InMemoryCache(),
});

// Wrap your Next.js App component with the ApolloProvider to make the client available to all components
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;