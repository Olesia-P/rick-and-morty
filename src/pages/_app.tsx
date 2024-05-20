import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

import { store } from "../store/index";
import { Layout } from "../components/layout/layout";
import "../styles/globals.scss";
import { client } from "../graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
