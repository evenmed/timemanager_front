import React from "react";
import { useRouter } from "next/router";

import CheckPermission from "../../src/User/CheckPermission";
import Loading from "../../src/helpers/Loading";
import UserCalendar from "../../src/Calendar/UserCalendar";

const userCalendar = () => {
  const router = useRouter();

  if (!router) return <Loading />;

  const { userId } = router.query;

  return (
    <CheckPermission permission={["ADMIN"]} showError={true}>
      <UserCalendar userId={userId} />
    </CheckPermission>
  );
};

export default userCalendar;
