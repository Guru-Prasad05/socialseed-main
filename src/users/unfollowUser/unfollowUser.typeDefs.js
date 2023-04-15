const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
  type Mutation {
    unfollowUser(username: String!): MutationResponse!
  }
`;
module.exports=typeDefs
