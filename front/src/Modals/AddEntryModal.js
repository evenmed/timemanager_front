import React, { useState } from "react";
import Modal, { ModalBody } from "./Modal";
import EditEvent from "../Calendar/EditEvent";

function AddEntryModal() {
  const [active, setActive] = useState(false);

  const hideModal = () => setActive(false);

  return (
    <>
      <button className="btn btn-success" onClick={() => setActive(true)}>
        <i className="fa fa-plus-circle"></i> Add event
      </button>
      <Modal title="New event" active={active} hideModal={hideModal}>
        <ModalBody>
          <EditEvent onSubmit={hideModal} />
        </ModalBody>
      </Modal>
    </>
  );
}

export default AddEntryModal;
