const Mutation = require("./Mutation");
const Query = require("./Query");
const Event = require("./Event");

const resolvers = {
  Query,
  Mutation,
  Event,
};

module.exports = resolvers;
