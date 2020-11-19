import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal, { ModalBody } from "./Modal";
import EditAccount from "../User/EditAccount";

function EditAccountModal(props) {
  const [active, setActive] = useState(false);
  const [userId, setUserId] = useState("");

  const showModal = (id = "") => {
    setActive(true);

    // Prevent event objects or anything else from being set as id
    if (typeof id === "string") setUserId(id);
  };

  const hideModal = () => setActive(false);

  return (
    <>
      {props.children(showModal, hideModal)}
      <Modal title="Edit Account" active={active} hideModal={hideModal}>
        <ModalBody>
          <EditAccount userId={userId} onSubmit={hideModal} />
        </ModalBody>
      </Modal>
    </>
  );
}

EditAccountModal.propTypes = {
  children: PropTypes.func.isRequired,
};

export default EditAccountModal;
