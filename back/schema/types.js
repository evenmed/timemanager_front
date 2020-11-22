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
    user(_id: ID!): User!
    users(
      limit: Int
      offset: Int
    ): [User!]!

    events(
      user: ID
    ): [Event!]!
    event(_id: ID): Event
  }

  type Mutation {
    createUser(
      username: String!,
      preferredWorkTime: Int!,
      password: String!,
      permissions: [Permission!]
    ): String! # JWT token
    logIn(
      username: String!,
      password: String!
    ): String! # JWT token
    # No logOut mutation because it's done through localStorage token
    updateAccount(
      userId: ID!
      username: String!
      preferredWorkTime: Int!
      permissions: [Permission!]
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
