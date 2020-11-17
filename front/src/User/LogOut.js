import { gql, useMutation } from "@apollo/client";

const LOG_OUT_MUTATION = gql`
  mutation logOut {
    logOut
  }
`;

const LogOut = () => {
  const [logOut, { error, loading }] = useMutation(LOG_OUT_MUTATION, {
    refetchQueries: ["me"],
    awaitRefetchQueries: true,
  });

  if (error) console.error(error);

  return (
    <button disabled={loading} className="btn btn-danger" onClick={logOut}>
      <i className="fa fa-sign-out"></i>{" "}
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
};

export default LogOut;
