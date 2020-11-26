import React from "react";
import PropTypes from "prop-types";

/**
 * Displays an error message. If the `error` prop is null, it won't
 * render anything. `error` can be an error object or simply a string.
 */
const DisplayError = ({ error }) => {
  const stringError = typeof error === "string";
  if (!error || (!error.message && !stringError)) return null;

  const formatErrorMessage = (msg) => {
    // Remove everything before ":"
    const parts = msg.split(":");
    return parts[parts.length - 1];
  };

  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div
        key={i}
        data-test="graphql-error"
        className="alert alert-danger my-3"
      >
        <i className="fa fa-fw fa-exclamation-circle"></i>{" "}
        <strong>Error: </strong>
        {formatErrorMessage(error.message)}
      </div>
    ));
  }

  return (
    <div className="alert alert-danger my-4" data-test="graphql-error">
      <i className="fa fa-fw fa-exclamation-circle"></i>{" "}
      <strong>Error: </strong>
      {formatErrorMessage(stringError ? error : error.message)}
    </div>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default DisplayError;
