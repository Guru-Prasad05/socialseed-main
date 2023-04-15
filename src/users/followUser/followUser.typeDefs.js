const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
  type Mutation {
    followUser(username: String!): MutationResponse
  }
`;

module.exports=typeDefs