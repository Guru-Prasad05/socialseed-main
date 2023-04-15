const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
  type Mutation {
    editPhoto(id: Int!, caption: String!): MutationResponse!
  }
`;

module.exports=typeDefs