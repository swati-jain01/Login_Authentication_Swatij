import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { useAuthToken } from "./auth";

const httpLink = new HttpLink({ uri: "https://caldera-server.apps.data-axle.com/graphql/" });

const authMiddleware = (authToken) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
    console.log("useAppApolloClient");
  const [authToken] = useAuthToken();
  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    fetchOptions: {
        mode: 'no-cors',
    },
    cache,
  });
};