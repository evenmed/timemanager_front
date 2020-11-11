import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";

// Bootstrap styles and theme
// @fullcalendar uses Bootstrap, so for simplicity's sake
// we'll just use it for the whole project
import "../styles/fontAwesome/all.min.css";
import "../styles/darkly.min.css";

// Custom styles
import "../styles/globals.sass";

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
