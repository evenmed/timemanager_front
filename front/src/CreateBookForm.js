import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import Error from "./helpers/Error";
import styles from "../styles/Helpers.module.sass";

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;

const CreateBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [addBook, { error, loading }] = useMutation(CREATE_BOOK, {
    refetchQueries: ["getBooks"],
  });

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        addBook({ variables: { title, author } }).catch((e) =>
          console.error(e)
        );
      }}
    >
      <fieldset disabled={loading}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <div>
          <button type="submit">{loading ? "Adding..." : "Add Book"}</button>
        </div>

        <Error error={error} />
      </fieldset>
    </form>
  );
};

export default CreateBookForm;
