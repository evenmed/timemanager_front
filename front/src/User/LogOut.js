import { useLazyQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";

/**
 * Log out button. Deletes session id from localStorage.
 */
const LogOut = (props) => {
  const [refreshUser, { error, loading }] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });

  if (error) console.error(error);

  return (
    <button
      disabled={loading}
      className="btn btn-danger"
      onClick={() => {
        if (props.onClick) props.onClick();

        localStorage.removeItem("token");
        refreshUser();
      }}
    >
      <i className="fa fa-sign-out"></i> Log out
    </button>
  );
};

export default LogOut;
