const { gql } = require("apollo-server-express");

const typeDefs=gql`
  type Query {
    seeRoom(id: Int!): Room
  }
`;

module.exports =typeDefs
