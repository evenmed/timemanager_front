const Mutation = require("./Mutation");
const Query = require("./Query");

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query,
  Mutation,
};

module.exports = resolvers;
