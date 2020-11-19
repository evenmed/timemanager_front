import React from "react";
import PropTypes from "prop-types";
import { useMutation, gql } from "@apollo/client";
import Error from "../helpers/Error";

const DELETE_EVENT_MUTATION = gql`
  mutation deleteEvent($_id: ID!) {
    deleteEvent(_id: $_id)
  }
`;

const DeleteEvent = ({ eventId, onSubmit: onCompleted }) => {
  const [deleteEvent, { loading, error }] = useMutation(DELETE_EVENT_MUTATION, {
    variables: { _id: eventId },
    refetchQueries: ["events"],
    onCompleted,
  });

  return (
    <>
      <Error error={error} />
      <button
        onClick={() => deleteEvent().catch((e) => console.error(e))}
        className="btn btn-danger btn-sm"
        type="button"
        disabled={loading}
      >
        <i className="fa fa-trash-alt"></i>{" "}
        {loading ? "Deleting..." : "Delete event"}
      </button>
    </>
  );
};

DeleteEvent.propTypes = {
  /** ID of event that should be deleted */
  eventId: PropTypes.string.isRequired,
  /** Callback for when an event is deleted properly */
  onSubmit: PropTypes.func,
};

export default DeleteEvent;
