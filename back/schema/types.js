const { gql } = require("apollo-server-express");
const { availablePermissions } = require("../models/User");

const permissionsString = availablePermissions.reduce((str, perm) => {
  return `${str}${perm}\n`;
}, "");

const types = gql`
  enum Permission {
    ${permissionsString}
  }
  
  type User {
    username: String!
    permissions: [Permission!]!
  }

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    book: Book
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    createUser(
      username: String!,
      password: String!,
      permissions: [Permission!]
    ): User
    logIn(
      username: String!,
      password: String!
    ): User
  }
`;

module.exports = types;
