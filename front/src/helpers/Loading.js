import React from "react";
import PropTypes from "prop-types";

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
