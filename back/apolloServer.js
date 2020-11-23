const { ApolloServer } = require("apollo-server-express");

const resolvers = require("./schema/resolvers");
const typeDefs = require("./schema/types");

const isDev = process.env.NODE_ENV === "development";

// Start Apollo Server
const createServer = (overrides) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    playground: isDev,
    context: ({ req, res }) => {
      return { req, res };
    },
    ...overrides,
  });

module.exports = createServer;
