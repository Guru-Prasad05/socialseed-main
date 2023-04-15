const {gql} = require("apollo-server-express");

const typeDefs=gql`
  type Mutation {
    editComment(id: Int!, payload: String!): MutationResponse!
  }
`;

module.exports=typeDefs