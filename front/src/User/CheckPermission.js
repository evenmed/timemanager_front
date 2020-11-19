import React, { useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./User";
import arrayIncludesAny from "../../lib/arrayIncludesAny";

/**
 * Checks if current user has a specific permission.
 * If not, can optionally show an error or simply not render children
 */
const CheckPermission = ({ permission, children, showError }) => {
  const { permissions: userPermissions } = useContext(UserContext);

  // Make sure user is signed in
  if (!userPermissions)
    return showError ? (
      <div className="alert alert-warning my-3">
        <i className="fa fa-exclamation-circle"></i> You must be signed in to
        access this page.
      </div>
    ) : null;

  // Check if user has necessary permission
  if (permission && !arrayIncludesAny(userPermissions, permission))
    return showError ? (
      <div className="alert alert-danger my-3">
        <i className="fa fa-exclamation-circle"></i> You are not authorized to
        access this page.
      </div>
    ) : null;

  return children;
};

CheckPermission.propTypes = {
  /**
   * Permission(s) to check for. If omitted, simply checks if user is logged in
   */
  permission: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * If true, shows an error for unauthorized users.
   * If false it just doesn't render children.
   * Defaults to false.
   */
  showError: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default CheckPermission;
