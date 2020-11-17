import React from "react";
import PropTypes from "prop-types";

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;

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
        {error.message.replace("username", "email")}
      </div>
    ));
  }

  return (
    <div className="alert alert-danger my-4" data-test="graphql-error">
      <strong>Error: </strong>
      {error.message.replace("username", "email")}
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
