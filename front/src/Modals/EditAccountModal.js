import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal, { ModalBody } from "./Modal";
import EditAccount from "../User/EditAccount";

/**
 * Modal to edit user's account. Child should be a function that receives 2
 * functions as arguments: `showModal` and `hideModal`.
 * `showModal` can optionally take a user's id as its only argument to edit
 * a specific user's account. Otherwise will edit user in context.
 */
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
