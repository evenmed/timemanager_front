import { useQuery, gql } from "@apollo/client";

import Error from "./helpers/Error";
import styles from "../styles/Home.module.css";

const BOOKS_QUERY = gql`
  query getBooks {
    books {
      title
      author
    }
  }
`;

const Books = () => {
  const { loading, error, data } = useQuery(BOOKS_QUERY);

  if (loading) return <p className={styles.description}>Fetching books...</p>;
  if (error) return <Error error={error} />;

  return (
    <ul>
      {data.books.map((book) => (
        <li key={book.title}>
          <p>
            <strong>{book.title}</strong> by {book.author}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Books;
export { BOOKS_QUERY };
