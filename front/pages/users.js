import React from "react";
import CheckPermission from "../src/User/CheckPermission";
import AddUserModal from "../src/Modals/AddUserModal";
import ManageUsers from "../src/User/ManageUsers";

const users = () => {
  return (
    <CheckPermission permission={["ADMIN", "USERMANAGER"]} showError={true}>
      <AddUserModal />
      <ManageUsers />
    </CheckPermission>
  );
};

export default users;
