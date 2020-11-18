import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal, { ModalBody, ModalFooter } from "./Modal";
import EditEvent from "../Calendar/EditEvent";

function EditEventModal(props) {
  const [active, setActive] = useState(false);
  const [eventId, setEventId] = useState("");
  const showModal = (id) => {
    setActive(true);
    setEventId(id);
  };
  const hideModal = () => setActive(false);

  return (
    <>
      {props.children(showModal, hideModal)}
      <Modal title="Edit event" active={active} hideModal={hideModal}>
        <ModalBody>
          <EditEvent eventId={eventId} onSubmit={hideModal} />
        </ModalBody>
      </Modal>
    </>
  );
}

EditEventModal.propTypes = {
  children: PropTypes.func.isRequired,
};

export default EditEventModal;
