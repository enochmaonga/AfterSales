import { ApolloClient, from } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import fetch from "cross-fetch";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import { onError } from "@apollo/client/link/error";
import ApolloCache from "./Cache";
import GetHeToken from "./GetHeToken";

const httpLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_APOLLO_CLIENT_HTTP_LINK_URI}`,
  credentials: "include",
  fetch,
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 6,
    retryIf: (error, operation) => {
      const {
        query: {
          definitions: [definition],
        },
      } = operation;
      const { operation: graphQlType } = definition;
      return graphQlType === "query";
    },
  },
});

// eslint-disable-next-line no-unused-vars
const authLink = setContext(() => {
  // get the authentication token from env file
  const token = localStorage.getItem("heToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      hetoken: token || "",
    },
  };
});

// eslint-disable-next-line no-unused-vars
const getNewToken = async () => {
  let token = "";
  try {
    const response = await GetHeToken.getHeToken();
    const { data, status } = response;
    if (status === 200) {
      const {
        data: {
          generateToken: { status: heStatus, token: heToken },
        },
      } = data;
      if (heStatus) {
        token = heToken || "";
        localStorage.setItem("heToken", token);
      }
    }
  } catch (error) {
    // do nothing for now
    // find a way to log to google analytics
  }
  return token;
};

const errorLink = onError(
  // eslint-disable-next-line consistent-return
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      return forward(operation);
    }
    let networkErrorMessage = "";
    if (
      networkError &&
      networkError.statusCode &&
      networkError.statusCode !== 200
    ) {
      networkErrorMessage = ` Error Code: ${networkError.statusCode}`;
    }
    if (networkError && networkError.message) {
      // eslint-disable-next-line no-param-reassign
      networkError.message =
        networkError.message.indexOf("JSON") !== -1
          ? `Sorry, we experienced a technical error. Please refresh this page or try again later.${networkErrorMessage}`
          : networkError.message;
      if (networkError.message === "Failed to fetch") {
        // eslint-disable-next-line no-param-reassign
        networkError.message =
          "Sorry, we encountered a connection error. Please check your internet connection and retry again. If the problem persists, please contact @Safaricom_Care on Twitter.";
      }
    }
  }
);

const Client = new ApolloClient({
  link: from([retryLink, errorLink, httpLink]),
  cache: ApolloCache,
  resolvers: {},
  connectToDevTools:
    process.env.NEXT_PUBLIC_APOLLO_ENVIRONMENT !== "production",
});

export default Client;
