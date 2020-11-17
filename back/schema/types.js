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
    _id: ID!
    username: String!
    permissions: [Permission!]!
  }
  
  type Event {
    _id: ID!
    user: User!
    title: String!
    date: String!
    time: Int!
    notes: String
  }

  type Query {
    me: User
    events(
      minDate: String!,
      maxDate: String!,
      user: ID
    ): [Event!]!
  }

  type Mutation {
    createUser(
      username: String!,
      password: String!,
      permissions: [Permission!]
    ): User
    logIn(
      username: String!,
      password: String!
    ): User
    logOut: Boolean

    updateEvent(
      _id: ID
      title: String!
      date: String!
      time: Int!
      notes: String
    ): Event
  }
`;

module.exports = types;
