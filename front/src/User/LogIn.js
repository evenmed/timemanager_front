import { Formik } from "formik";
import { useMutation, useLazyQuery, gql } from "@apollo/client";

import { CURRENT_USER_QUERY } from "./User";
import Error from "../helpers/Error";

const LOG_IN_MUTATION = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password)
  }
`;

function LogIn(props) {
  const [logIn, { error, loading }] = useMutation(LOG_IN_MUTATION);
  const [refreshUser] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });

  return (
    <div>
      <h3>Log In</h3>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) =>
          logIn({ variables: values })
            .then((res) => {
              if (res && res.data && res.data.logIn) {
                localStorage.setItem("token", res.data.logIn);
                refreshUser();
              }
            })
            .catch((e) => {
              console.error(e);
            })
        }
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Error error={error} />
            <div className="form-group">
              <label htmlFor="logInUsername">Username</label>
              <input
                type="username"
                className="form-control"
                name="username"
                id="logInUsername"
                autoComplete="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
            </div>
            <div className="form-group">
              <label htmlFor="logInPassword">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="logInPassword"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
            <button
              className="btn btn-success btn-block"
              type="submit"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LogIn;
