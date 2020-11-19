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
    preferredWorkTime: Int!
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
      user: ID
    ): [Event!]!
    event(_id: ID): Event
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
    updateAccount(
      userId: ID!
      username: String!
      preferredWorkTime: Int!
    ): User!

    updateEvent(
      _id: ID
      title: String!
      date: String!
      time: Int!
      notes: String
    ): Event

    deleteEvent(_id: ID!): Boolean!
  }
`;

module.exports = types;
