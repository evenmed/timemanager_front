import React, { useContext } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Formik, Field } from "formik";
import InputMask from "react-input-mask";
import PropTypes from "prop-types";

import { UserContext } from "./User";
import CheckPermission from "./CheckPermission";
import Error from "../helpers/Error";
import Loading from "../helpers/Loading";
import readableTimeString from "../../lib/readableTimeString";
import timeStringToMinutes from "../../lib/timeStringToMinutes";
import minutesToTimeString from "../../lib/minutesToTimeString";

const UPDATE_ACCOUNT_MUTATION = gql`
  mutation updateAccount(
    $userId: ID!
    $username: String!
    $preferredWorkTime: Int!
    $permissions: [Permission!]
  ) {
    updateAccount(
      userId: $userId
      username: $username
      preferredWorkTime: $preferredWorkTime
      permissions: $permissions
    ) {
      _id
    }
  }
`;

const SINGLE_USER_QUERY = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      permissions
      preferredWorkTime
    }
  }
`;

const EditAccount = (props) => {
  const currentUser = useContext(UserContext);

  const [
    updateAccount,
    { error, loading },
  ] = useMutation(UPDATE_ACCOUNT_MUTATION, { refetchQueries: ["me", "users"] });

  const { data, error: queryError, loading: queryLoading } = useQuery(
    SINGLE_USER_QUERY,
    {
      variables: { _id: props.userId || currentUser._id },
      fetchPolicy: "network-only",
    }
  );

  if (queryLoading) return <Loading text="Fetching user..." />;
  if (queryError) return <Error error={error} />;

  const { user } = data;

  return (
    <Formik
      initialValues={{
        username: user.username,
        preferredWorkTime: minutesToTimeString(user.preferredWorkTime),
        permissions: user.permissions,
      }}
      validate={(values) => {
        const errors = {};

        if (values.preferredWorkTime) {
          const mins = timeStringToMinutes(values.preferredWorkTime);

          if (mins < 15 || mins > 1440)
            errors.preferredWorkTime =
              "Daily work objective must be between 15 mins and 24 hours";
        }

        return errors;
      }}
      validateOnChange={false}
      onSubmit={(values) =>
        updateAccount({
          variables: {
            username: values.username,
            preferredWorkTime: timeStringToMinutes(values.preferredWorkTime),
            userId: props.userId || user._id,
            // Only admins can edit permissions
            permissions: currentUser.permissions.includes("ADMIN")
              ? values.permissions
              : null,
          },
        })
          .then((res) => {
            if (props.onSubmit && res && res.data && res.data.updateAccount) {
              props.onSubmit();
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
            <label htmlFor={`${user._id}-editUsername`}>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              id={`${user._id}-editUsername`}
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
            <label htmlFor={`${user._id}-editPwt`}>
              Daily work objective (HH:MM)
            </label>
            <InputMask
              mask="99:99"
              alwaysShowMask={true}
              className="form-control"
              name="preferredWorkTime"
              id={`${user._id}-editPwt`}
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

          <CheckPermission permission={["ADMIN"]}>
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
                <Field type="checkbox" name="permissions" value="USERMANAGER" />{" "}
                USERMANAGER
              </label>
            </div>
            <div>
              <label>
                <Field type="checkbox" name="permissions" value="ADMIN" /> ADMIN
              </label>
            </div>
          </CheckPermission>

          <button
            className="btn btn-success btn-block"
            type="submit"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? "Saving..." : "Save"}
          </button>
        </form>
      )}
    </Formik>
  );
};

EditAccount.propTypes = {
  /** Callback for when an event is saved / deleted properly */
  onSubmit: PropTypes.func,
  /** ID of user to be edited (defaults to logged in user) */
  userId: PropTypes.string,
};

export default EditAccount;
export { SINGLE_USER_QUERY };
