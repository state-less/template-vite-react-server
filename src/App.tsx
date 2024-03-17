import reactLogo from "./assets/react.svg";
import ReactServerLogo from "./assets/reactserver.svg?react";
import viteLogo from "/vite.svg";
import { HelloWorldExample } from "./server-components/examples";
import { ApolloProvider } from "@apollo/client";
import client, { localClient } from "./lib/client";
import { LOCAL_HOST, USE_PROD_CLIENT } from "./lib/config";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";
import { Suspense } from "react";

function App() {
  return (
    <>
      <ApolloProvider client={USE_PROD_CLIENT ? client : localClient || client}>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a
            href="https://reactserver.dev"
            target="_blank"
            style={{ color: "white" }}
          >
            <ReactServerLogo className="logo react" alt="React Server logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <ErrorBoundary
            fallback={
              <div className="error">
                <h2>{`Could not connect to server`}</h2>
                Make sure you have a React Server instance running on{' '}
                <em>{LOCAL_HOST}</em> or start Vite with
                <pre>
                  <code>yarn dev --mode=production</code>
                </pre>
              </div>
            }
          >
            <HelloWorldExample />
          </ErrorBoundary>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </ApolloProvider>
    </>
  );
}

export default App;
