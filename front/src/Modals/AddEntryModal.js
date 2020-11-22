import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal, { ModalBody } from "./Modal";
import EditEvent from "../Calendar/EditEvent";

function AddEntryModal({ onSubmit }) {
  const [active, setActive] = useState(false);

  const hideModal = () => setActive(false);

  return (
    <>
      <button className="btn btn-success" onClick={() => setActive(true)}>
        <i className="fa fa-plus-circle"></i> Add event
      </button>
      <Modal title="New event" active={active} hideModal={hideModal}>
        <ModalBody>
          <EditEvent
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

AddEntryModal.propTypes = {
  /** Callback for when an event is saved / deleted properly */
  onSubmit: PropTypes.func,
};

export default AddEntryModal;
