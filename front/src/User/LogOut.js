import { useLazyQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";

const LogOut = () => {
  const [refreshUser, { error, loading }] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });

  if (error) console.error(error);

  return (
    <button
      disabled={loading}
      className="btn btn-danger"
      onClick={() => {
        localStorage.removeItem("token");
        refreshUser();
      }}
    >
      <i className="fa fa-sign-out"></i> Log out
    </button>
  );
};

export default LogOut;
