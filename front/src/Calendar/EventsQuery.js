import { gql } from "@apollo/client";

export default gql`
  query events($user: ID) {
    events(user: $user) {
      _id
      date
      time
      title
      notes
    }
  }
`;
