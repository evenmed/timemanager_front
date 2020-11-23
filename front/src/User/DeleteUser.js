import React from "react";
import PropTypes from "prop-types";
import { useMutation, gql } from "@apollo/client";
import Error from "../helpers/Error";

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id)
  }
`;

const DeleteUser = ({ userId, onSubmit: onCompleted }) => {
  const [deleteUser, { loading, error }] = useMutation(DELETE_USER_MUTATION, {
    variables: { _id: userId },
    refetchQueries: ["users"],
    onCompleted,
  });

  return (
    <>
      <Error error={error} />
      <button
        onClick={() =>
          confirm("Are you sure you want to delete this account?")
            ? deleteUser().catch((e) => console.error(e))
            : false
        }
        className="btn btn-danger btn-sm"
        type="button"
        disabled={loading}
      >
        <i className="fa fa-trash-alt"></i>{" "}
        {loading ? "Deleting..." : "Delete account"}
      </button>
    </>
  );
};

DeleteUser.propTypes = {
  /** ID of user that should be deleted */
  userId: PropTypes.string.isRequired,
  /** Callback for when a user is deleted properly */
  onSubmit: PropTypes.func,
};

export default DeleteUser;
