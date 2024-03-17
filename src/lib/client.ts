import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
} from "@apollo/client/index.js";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { LOCAL_HOST, LOCAL_HOST_WS, PROD_HOST, PROD_HOST_WS } from "./config";

// Create an HTTP link
const statelessHttp = new HttpLink({
  uri: PROD_HOST,
});

// Create a WebSocket link
const statelessWs = import.meta.env.SSR
  ? null
  : new WebSocketLink({
      uri: PROD_HOST_WS,
      options: {
        reconnect: true,
      },
    });

// Use the split function to direct traffic between the two links
const stateless = import.meta.env.SSR
  ? statelessHttp
  : split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      statelessWs as WebSocketLink,
      statelessHttp
    );

export const ssrCache = new InMemoryCache();
// Create the Apollo Client instance

export const makeClient = () => {
  return new ApolloClient({
    ssrMode: import.meta.env.SSR,
    link: stateless,
    cache: import.meta.env.SSR
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__APOLLO_STATE__),
  });
};

const client = makeClient();

let localClient: null | ApolloClient<unknown> = null;
// Create an HTTP link
if (
  typeof window !== "undefined" &&
  window.location.host.includes("localhost")
) {
  const localHttp = new HttpLink({
    uri: LOCAL_HOST,
  });

  // Create a WebSocket link
  const localWs = new WebSocketLink({
    uri: LOCAL_HOST_WS,
    options: {
      reconnect: true,
      timeout: 60000,
    },
  });

  // Use the split function to direct traffic between the two links
  const local = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    localWs,
    localHttp
  );

  // Create the Apollo Client instance
  localClient = new ApolloClient({
    link: local,
    cache: new InMemoryCache(),
  });
}

export { localClient };
export default client;
