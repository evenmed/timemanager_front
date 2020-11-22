import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import User from "../src/User/User";
import Header from "../src/Header";
import LogInRegister from "../src/User/LogInRegister";

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

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ultimate Time Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <div className="container py-4">
          <User>
            {(isLoggedIn) => (
              <>
                <Header />
                {isLoggedIn ? (
                  <Component {...pageProps} />
                ) : (
                  <div className="row justify-content-md-center">
                    <LogInRegister />
                  </div>
                )}
              </>
            )}
          </User>
        </div>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
