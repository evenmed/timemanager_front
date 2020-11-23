import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal, { ModalBody } from "./Modal";
import Register from "../User/Register";

function AddUserModal({ onSubmit }) {
  const [active, setActive] = useState(false);

  const hideModal = () => setActive(false);

  return (
    <>
      <button className="btn btn-success" onClick={() => setActive(true)}>
        <i className="fa fa-plus-circle"></i> Add user
      </button>
      <Modal title="New user" active={active} hideModal={hideModal}>
        <ModalBody>
          <Register
            hideTitle
            onSubmit={() => {
              hideModal();
              if (onSubmit) onSubmit();
            }}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

AddUserModal.propTypes = {
  /** Callback for when an user is created properly */
  onSubmit: PropTypes.func,
};

export default AddUserModal;
