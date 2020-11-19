import React, { useState } from "react";
import Modal, { ModalBody } from "./Modal";
import EditAccount from "../User/EditAccount";

function SettingsModal() {
  const [active, setActive] = useState(false);

  const hideModal = () => setActive(false);

  return (
    <>
      <button className="btn btn-info" onClick={() => setActive(true)}>
        <i className="fa fa-cog"></i> Settings
      </button>
      <Modal title="Settings" active={active} hideModal={hideModal}>
        <ModalBody>
          <EditAccount onSubmit={hideModal} />
        </ModalBody>
      </Modal>
    </>
  );
}

export default SettingsModal;
