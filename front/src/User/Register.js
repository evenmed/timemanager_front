import { Formik } from "formik";
import { useMutation, gql } from "@apollo/client";

import Error from "../helpers/Error";

const REGISTER_MUTATION = gql`
  mutation register($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      _id
    }
  }
`;

function Register(props) {
  const [register, { error, loading }] = useMutation(REGISTER_MUTATION, {
    refetchQueries: ["me"],
    awaitRefetchQueries: true,
  });

  return (
    <div>
      <h3>Register</h3>
      <Formik
        initialValues={{ username: "", password: "", passwordConfirm: "" }}
        validate={(values) => {
          const errors = {};
          if (
            values.password &&
            values.passwordConfirm &&
            values.password !== values.passwordConfirm
          ) {
            errors.passwordConfirm = "Passwords do not match";
          }
          return errors;
        }}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting, errors }) => {
          if (errors && errors.length) return;

          register({ variables: values })
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
              <label htmlFor="registerUsername">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="registerUsername"
                autoComplete="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && (
                <p className="text-danger">{errors.username}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="registerPassword">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="registerPassword"
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="registerPasswordConfirm">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="passwordConfirm"
                id="registerPasswordConfirm"
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirm}
              />
              {errors.passwordConfirm && (
                <p className="text-danger">{errors.passwordConfirm}</p>
              )}
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

export default Register;
