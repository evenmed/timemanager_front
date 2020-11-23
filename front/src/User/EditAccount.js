import React, { useContext } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Formik, Field } from "formik";
import InputMask from "react-input-mask";
import PropTypes from "prop-types";

import { UserContext } from "./User";
import DeleteUser from "./DeleteUser";
import CheckPermission from "./CheckPermission";
import Error from "../helpers/Error";
import Loading from "../helpers/Loading";
import readableTimeString from "../../lib/readableTimeString";
import timeStringToMinutes from "../../lib/timeStringToMinutes";
import minutesToTimeString from "../../lib/minutesToTimeString";
import arrayIncludesAny from "../../lib/arrayIncludesAny";

const UPDATE_ACCOUNT_MUTATION = gql`
  mutation updateAccount(
    $userId: ID!
    $username: String!
    $preferredWorkTime: Int!
    $permissions: [Permission!]
    $currentPw: String
    $newPw: String
  ) {
    updateAccount(
      userId: $userId
      username: $username
      preferredWorkTime: $preferredWorkTime
      permissions: $permissions
      currentPw: $currentPw
      newPw: $newPw
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
  const updatingOtherAcount = user._id !== currentUser._id;

  return (
    <>
      <Formik
        initialValues={{
          username: user.username,
          preferredWorkTime: minutesToTimeString(user.preferredWorkTime),
          permissions: user.permissions,
          updatePw: false,
          currentPw: "",
          newPw: "",
          newPwConfirm: "",
        }}
        validate={(values) => {
          const errors = {};

          if (values.preferredWorkTime) {
            const mins = timeStringToMinutes(values.preferredWorkTime);

            if (mins < 15 || mins > 1440)
              errors.preferredWorkTime =
                "Daily work objective must be between 15 mins and 24 hours";
          }

          if (
            values.updatePw &&
            values.newPw &&
            values.newPwConfirm &&
            values.newPw !== values.newPwConfirm
          ) {
            errors.newPwConfirm = "Passwords do not match.";
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
              permissions: arrayIncludesAny(currentUser.permissions, [
                "ADMIN",
                "USERMANAGER",
              ])
                ? values.permissions
                : null,
              currentPw:
                values.updatePw && !updatingOtherAcount
                  ? values.currentPw
                  : null,
              newPw: values.updatePw ? values.newPw : null,
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

            <div>
              <label>
                <Field type="checkbox" name="updatePw" /> Change password
              </label>
            </div>
            {values.updatePw && (
              <>
                {!updatingOtherAcount && (
                  <div className="form-group">
                    <label htmlFor={`${user._id}-currentPw`}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="currentPw"
                      id={`${user._id}-currentPw`}
                      autoComplete="current-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.currentPw}
                    />
                    {errors.currentPw && (
                      <p className="text-danger">{errors.currentPw}</p>
                    )}
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor={`${user._id}-newPw`}>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPw"
                    id={`${user._id}-newPw`}
                    autoComplete="new-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPw}
                  />
                  {errors.newPw && (
                    <p className="text-danger">{errors.newPw}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor={`${user._id}-newPwConfirm`}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPwConfirm"
                    id={`${user._id}-newPwConfirm`}
                    autoComplete="new-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPwConfirm}
                  />
                  {errors.newPwConfirm && (
                    <p className="text-danger">{errors.newPwConfirm}</p>
                  )}
                </div>
              </>
            )}

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

            <button
              className="btn btn-success btn-block mb-3"
              type="submit"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? "Saving..." : "Save"}
            </button>
          </form>
        )}
      </Formik>
      {updatingOtherAcount && (
        <div className="justify-content-end row">
          <div className="col-auto">
            <DeleteUser userId={user._id} onSubmit={props.onSubmit} />
          </div>
        </div>
      )}
    </>
  );
};

EditAccount.propTypes = {
  /** Callback for when a user is saved / deleted properly */
  onSubmit: PropTypes.func,
  /** ID of user to be edited (defaults to logged in user) */
  userId: PropTypes.string,
};

export default EditAccount;
export { SINGLE_USER_QUERY };
