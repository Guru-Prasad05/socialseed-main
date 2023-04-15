const {gql} = require("apollo-server-express");
 const typeDefs=gql`
  type Mutation {
    createComment(photoId: Int!, payload: String!): MutationResponse!
  }
`;

module.exports=typeDefs
