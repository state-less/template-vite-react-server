/**
 * The url that points to a *local* React Server instance.
 */
export const LOCAL_HOST = "http://localhost:4000/graphql";
export const LOCAL_HOST_WS = "ws://localhost:4000/graphql";

/**
 * The url that points to the production React Server instance.
 */
export const PROD_HOST = "https://graphql.state-less.cloud/graphql";
export const PROD_HOST_WS = `wss://graphql.state-less.cloud/graphql`;

export const USE_PROD_CLIENT = import.meta.env.MODE === "production";
