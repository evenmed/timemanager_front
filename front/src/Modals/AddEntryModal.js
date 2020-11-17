import React from "react";
import Modal, { ModalBody, ModalFooter } from "./Modal";
import EditEvent from "../Calendar/EditEvent";

function AddEntryModal() {
  return (
    <Modal
      className="modal"
      toggleButtonContent={
        <>
          <i className="fa fa-plus-circle"></i> Add event
        </>
      }
      toggleButtonType="success"
      title="Add event"
    >
      {(hideModal) => (
        <>
          <ModalBody>
            <EditEvent onSubmit={hideModal} />
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={hideModal}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
}

export default AddEntryModal;
