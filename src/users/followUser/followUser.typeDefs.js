const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
  type Mutation {
    followUser(id: Int!): MutationResponse
  }
`;

module.exports=typeDefs