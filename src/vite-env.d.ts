/// <reference types="vite/client" />

import { NormalizedCacheObject } from "@apollo/client";

type ApolloState = NormalizedCacheObject;

declare global {
  interface Window {
    __APOLLO_STATE__: ApolloState;
  }
}
