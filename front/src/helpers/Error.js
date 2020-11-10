import React from "react";
import PropTypes from "prop-types";

import styles from "../../styles/Helpers.module.sass";

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <p key={i} data-test="graphql-error" className={styles.error}>
        <strong>Error: </strong>
        {error.message.replace("GraphQL error: ", "")}
      </p>
    ));
  }
  return (
    <p data-test="graphql-error" className={styles.error}>
      <strong>Error: </strong>
      {error.message.replace("GraphQL error: ", "")}
    </p>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
