import React from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";

import { SINGLE_USER_QUERY } from "../User/EditAccount";
import { UserContext } from "../User/User";
import Loading from "../../src/helpers/Loading";
import Error from "../../src/helpers/Error";

// Don't SSR the calendar, as fullcalendar doesn't support it
const DynamicCalendar = dynamic(() => import("./Calendar"), {
  ssr: false,
});

const UserCalendar = ({ userId }) => {
  const { data, error, loading } = useQuery(SINGLE_USER_QUERY, {
    variables: { _id: userId },
  });

  if (loading) return <Loading text="Fetching user's calendar..." />;
  if (error) return <Error error={error} />;

  if (!data || !data.user) return <Error error="User not found" />;

  return (
    <UserContext.Provider value={data.user}>
      <DynamicCalendar />
    </UserContext.Provider>
  );
};

UserCalendar.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserCalendar;
