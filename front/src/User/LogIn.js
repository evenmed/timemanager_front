import { Formik } from "formik";
import { useMutation, gql } from "@apollo/client";

import Error from "../helpers/Error";

const LOG_IN_MUTATION = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      username
    }
  }
`;

function LogIn(props) {
  const [logIn, { error, loading }] = useMutation(LOG_IN_MUTATION, {
    refetchQueries: ["me", "events"],
    awaitRefetchQueries: true,
  });

  return (
    <div>
      <h3>Log In</h3>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          logIn({ variables: values })
            .then((res) => {
              setSubmitting(false);
            })
            .catch((e) => {
              setSubmitting(false);
              console.error(e);
            });
        }}
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
