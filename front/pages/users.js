import React from "react";
import CheckPermission from "../src/User/CheckPermission";
import ManageUsers from "../src/User/ManageUsers";

const users = () => {
  return (
    <CheckPermission permission={["ADMIN", "USERMANAGER"]} showError={true}>
      <ManageUsers />
    </CheckPermission>
  );
};

export default users;
