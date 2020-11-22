import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal, { ModalBody } from "./Modal";
import EditEvent from "../Calendar/EditEvent";

function EditEventModal(props) {
  const [active, setActive] = useState(false);
  const [eventId, setEventId] = useState("");
  const showModal = (id) => {
    setActive(true);

    // Prevent event objects or anything else from being set as id
    if (typeof id === "string") setEventId(id);
  };
  const hideModal = () => setActive(false);

  return (
    <>
      {props.children(showModal, hideModal)}
      <Modal title="Edit event" active={active} hideModal={hideModal}>
        <ModalBody>
          <EditEvent
            eventId={eventId}
            onSubmit={() => {
              hideModal();
              if (props.onSubmit) props.onSubmit();
            }}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

EditEventModal.propTypes = {
  children: PropTypes.func.isRequired,
  /** Callback for when an event is saved / deleted properly */
  onSubmit: PropTypes.func,
};

export default EditEventModal;
