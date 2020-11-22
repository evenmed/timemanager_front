import React, { useState } from "react";
import Modal, { ModalBody } from "./Modal";
import ExportEvents from "../Calendar/ExportEvents";

const ExportEventsModal = () => {
  const [active, setActive] = useState(false);

  const hideModal = () => setActive(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => setActive(true)}>
        <i className="fa fa-file-export"></i> Export
      </button>
      <Modal title="Export events" active={active} hideModal={hideModal}>
        <ModalBody>
          <ExportEvents onSubmit={hideModal} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ExportEventsModal;
