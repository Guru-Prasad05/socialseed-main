const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Mutation {
    removeFollower(id: Int!): MutationResponse!
  }
`;
module.exports = typeDefs;
