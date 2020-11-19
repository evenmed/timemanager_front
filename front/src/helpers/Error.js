import React from "react";
import PropTypes from "prop-types";

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;

  const formatErrorMessage = (msg) => {
    // Remove everything before ":"
    const parts = msg.split(":");
    return parts[parts.length - 1];
  };

  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div
        key={i}
        data-test="graphql-error"
        className="alert alert-danger my-4"
      >
        <strong>Error: </strong>
        {formatErrorMessage(error.message)}
      </div>
    ));
  }

  return (
    <div className="alert alert-danger my-4" data-test="graphql-error">
      <strong>Error: </strong>
      {formatErrorMessage(error.message)}
    </div>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
