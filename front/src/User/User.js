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

  if (!data.me) {
    if (props.unauthorizedContent) return props.unauthorizedContent;

    return (
      <Error error={{ message: "You must be signed in to see this content" }} />
    );
  }

  return props.children(data.me);
};

User.propTypes = {
  children: PropTypes.func.isRequired,
  unauthorizedContent: PropTypes.element,
};

export default User;
export { CURRENT_USER_QUERY };
