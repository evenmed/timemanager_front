import { Formik, Field } from "formik";
import InputMask from "react-input-mask";
import { useMutation, useLazyQuery, gql } from "@apollo/client";

import { CURRENT_USER_QUERY, UserContext } from "./User";
import CheckPermission from "./CheckPermission";
import Error from "../helpers/Error";
import readableTimeString from "../../lib/readableTimeString";
import timeStringToMinutes from "../../lib/timeStringToMinutes";
import { useContext } from "react";

const REGISTER_MUTATION = gql`
  mutation register(
    $username: String!
    $preferredWorkTime: Int!
    $password: String!
    $permissions: [Permission!]
  ) {
    createUser(
      username: $username
      preferredWorkTime: $preferredWorkTime
      password: $password
      permissions: $permissions
    )
  }
`;

/**
 * Form to register new users. Can be used both by logged out users as well
 * as ADMINs and UMs. If it's a logged out user, it will also log them in.
 */
function Register(props) {
  const { _id: currentUserId } = useContext(UserContext);

  const [register, { error, loading }] = useMutation(REGISTER_MUTATION, {
    refetchQueries: ["me", "users"],
    awaitRefetchQueries: true,
  });

  const [refreshUser] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });

  return (
    <div>
      {!props.hideTitle && <h3>Register</h3>}
      <Formik
        initialValues={{
          username: "",
          preferredWorkTime: "08:00",
          permissions: ["USER"],
          password: "",
          passwordConfirm: "",
        }}
        validate={(values) => {
          const errors = {};
          if (
            values.password &&
            values.passwordConfirm &&
            values.password !== values.passwordConfirm
          ) {
            errors.passwordConfirm = "Passwords do not match";
          }

          if (values.preferredWorkTime) {
            const mins = timeStringToMinutes(values.preferredWorkTime);

            if (mins < 15 || mins > 1440)
              errors.preferredWorkTime =
                "Daily work objective must be between 15 mins and 24 hours";
          }
          return errors;
        }}
        validateOnChange={false}
        onSubmit={(values, { resetForm }) =>
          register({
            variables: {
              username: values.username,
              preferredWorkTime: timeStringToMinutes(values.preferredWorkTime),
              password: values.password,
              permissions: currentUserId ? values.permissions : null,
            },
          })
            .then((res) => {
              if (props.onSubmit) props.onSubmit();

              if (res && res.data && res.data.createUser && !currentUserId) {
                localStorage.setItem("token", res.data.createUser);
                refreshUser();
              }

              if (currentUserId) resetForm();
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
              <label htmlFor="registerPwt">Daily work objective (HH:MM)</label>
              <InputMask
                mask="99:99"
                alwaysShowMask={true}
                className="form-control"
                name="preferredWorkTime"
                id="registerPwt"
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.preferredWorkTime}
                required
              />
              {readableTimeString(values.preferredWorkTime) && (
                <p className="text-muted mb-0">
                  {readableTimeString(values.preferredWorkTime)}
                </p>
              )}
              {errors.preferredWorkTime && (
                <p className="text-danger">{errors.preferredWorkTime}</p>
              )}
            </div>

            <CheckPermission permission={["ADMIN", "USERMANAGER"]}>
              <div>
                <strong>Permissions:</strong>
              </div>
              <div>
                <label>
                  <Field type="checkbox" name="permissions" value="USER" /> USER
                </label>
              </div>
              <div>
                <label>
                  <Field
                    type="checkbox"
                    name="permissions"
                    value="USERMANAGER"
                  />{" "}
                  USERMANAGER
                </label>
              </div>
            </CheckPermission>
            <CheckPermission permission={["ADMIN"]}>
              <div>
                <label>
                  <Field type="checkbox" name="permissions" value="ADMIN" />{" "}
                  ADMIN
                </label>
              </div>
            </CheckPermission>

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
