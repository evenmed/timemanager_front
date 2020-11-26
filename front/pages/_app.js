import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import Page from "../src/Page";

// NProgress
import "../styles/nprogress.sass";

// Bootstrap styles and theme
// @fullcalendar uses Bootstrap, so for simplicity's sake
// we'll just use it for the whole project
import "../styles/fontAwesome/all.min.css";
import "../styles/darkly.min.css";

// Datepicker styles
import "react-datepicker/dist/react-datepicker.css";

// Custom styles
import "../styles/globals.sass";

/**
 * Wrap our entire app in our ApolloProvider and our <Page>, which
 * takes care of authentication and general layout
 */
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ultimate Time Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
