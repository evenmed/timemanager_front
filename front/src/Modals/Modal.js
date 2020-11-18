import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = (props) => {
  useEffect(() => {
    if (props.active) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [props.active]);

  return (
    <>
      <div
        className={`modal fade ${props.active ? "show" : ""}`}
        style={{
          display: "block",
          pointerEvents: props.active ? "all" : "none",
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
                onClick={props.hideModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {props.children}
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
  /** Whether to show modal or not */
  active: PropTypes.bool.isRequired,
  /** Function to hide modal (turn `active` to false) */
  hideModal: PropTypes.func.isRequired,
  /** Modal title */
  title: PropTypes.string.isRequired,
  /** Modal content */
  children: PropTypes.node.isRequired,
};

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};
ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
export { ModalBody, ModalFooter };
