const { gql } = require("apollo-server-express");

const types = gql`
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    book: Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`;

module.exports = types;
