import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import User from "../src/User/User";
import Nav from "../src/User/Nav";
import LogInRegister from "../src/User/LogInRegister";

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
        <title>Ultimate Time Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <div className="container pt-4">
          <User>
            {(isLoggedIn) => (
              <>
                <div className="row">
                  <div className="col-12">
                    <Nav />
                  </div>
                </div>
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
