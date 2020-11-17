import React, { useState } from "react";
import PropTypes from "prop-types";

const Modal = (props) => {
  const [active, setActive] = useState(false);

  const showModal = () => {
    document.body.classList.add("modal-open");
    setActive(true);
  };

  const hideModal = () => {
    document.body.classList.remove("modal-open");
    setActive(false);
  };

  return (
    <>
      <button
        className={`btn btn-${
          props.toggleButtonType ? props.toggleButtonType : "primary"
        }`}
        onClick={showModal}
      >
        {props.toggleButtonContent}
      </button>
      <div
        className={`modal fade ${active ? "show" : ""}`}
        style={{
          display: "block",
          pointerEvents: active ? "all" : "none",
        }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={hideModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {props.children(hideModal)}
          </div>
        </div>
      </div>
    </>
  );
};

const ModalBody = ({ children }) => (
  <div className="modal-body">{children}</div>
);

const ModalFooter = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

Modal.propTypes = {
  toggleButtonContent: PropTypes.element.isRequired,
  toggleButtonType: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
ModalFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
export { ModalBody, ModalFooter };
