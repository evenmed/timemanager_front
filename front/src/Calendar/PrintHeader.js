import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { UserContext } from "../User/User";
import minutesToHours from "../../lib/minutesToHours";

const PrintHeader = ({ startDate, endDate }) => {
  const { username, preferredWorkTime } = useContext(UserContext);

  return (
    <>
      <div className="row justify-content-center mb-4">
        <div className="col-auto text-center">
          <h4>
            Events from {moment(startDate).format("MMMM Do, YYYY")} to{" "}
            {moment(endDate).format("MMMM Do, YYYY")}
          </h4>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col">
          <p>
            <strong>User: </strong>
            {username}
          </p>
        </div>
        <div className="col text-right">
          <p className="mb-3">
            <strong>Daily work objective: </strong>
            {minutesToHours(preferredWorkTime)} hours
          </p>
        </div>
      </div>
    </>
  );
};

PrintHeader.propTypes = {
  /** Start date object */
  startDate: PropTypes.object.isRequired,
  /** End date object */
  endDate: PropTypes.object.isRequired,
};

export default PrintHeader;
