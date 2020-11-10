import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";

import "../styles/globals.sass";
import "../styles/darkly.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Toptal Interview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
