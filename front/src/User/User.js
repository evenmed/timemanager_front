import { useQuery, gql } from "@apollo/client";
import PropTypes from "prop-types";
import Error from "../helpers/Error";

const CURRENT_USER_QUERY = gql`
  query me {
    me {
      username
      permissions
    }
  }
`;

const User = (props) => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <p>Authenticating...</p>;
  if (error) return <Error error={error} />;

  return props.children(data.me);
};

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
