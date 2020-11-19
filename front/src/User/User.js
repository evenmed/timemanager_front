import { useQuery, gql } from "@apollo/client";
import PropTypes from "prop-types";
import { createContext } from "react";
import Error from "../helpers/Error";

const CURRENT_USER_QUERY = gql`
  query me {
    me {
      _id
      username
      permissions
      preferredWorkTime
    }
  }
`;

const UserContext = createContext(false);

/**
 * Gets currently logged in user and makes it available via context.
 * Child must be a function that receives a isLoggedIn boolean
 */
const User = (props) => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <p>Authenticating...</p>;
  if (error) return <Error error={error} />;

  return (
    <UserContext.Provider value={data.me}>
      {props.children(data.me ? true : false)}
    </UserContext.Provider>
  );
};

User.propTypes = {
  /** Function that receives a isLoggedIn boolean */
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY, UserContext };
