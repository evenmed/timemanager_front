import React from "react";
import PropTypes from "prop-types";

/**
 * Displays a loading spinner. You can optionally pass a
 * `text` prop to display a message under the spinner
 */
const Loading = ({ text = "" }) => {
  return (
    <div className="py-5 text-center">
      <i className="fa fa-spinner fa-3x fa-spin"></i>
      {text && <p className="mt-4">{text}</p>}
    </div>
  );
};

Loading.propTypes = {
  /** Optional text to display under loading spinner */
  text: PropTypes.string,
};

export default Loading;
