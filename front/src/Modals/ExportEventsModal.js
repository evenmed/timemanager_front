import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal, { ModalBody } from "./Modal";
import ExportEvents from "../Calendar/ExportEvents";

/**
 * Modal to export events from a date range from the user passed via
 * context.
 * You must pass a function to do the actual export as the
 * `exportEvents` prop.
 */
const ExportEventsModal = ({ exportEvents }) => {
  const [active, setActive] = useState(false);

  const hideModal = () => setActive(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => setActive(true)}>
        <i className="fa fa-file-export"></i> Export
      </button>
      <Modal title="Export events" active={active} hideModal={hideModal}>
        <ModalBody>
          <ExportEvents {...{ exportEvents, onSubmit: hideModal }} />
        </ModalBody>
      </Modal>
    </>
  );
};

ExportEventsModal.propTypes = {
  /**
   * Function to export events. Should take in a fromDate and toDate as its
   * arguments.
   */
  exportEvents: PropTypes.func.isRequired,
};

export default ExportEventsModal;
