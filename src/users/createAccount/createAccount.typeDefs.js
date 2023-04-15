const {gql} = require("apollo-server-express"); 

const typeDefs= gql`
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): MutationResponse!
  }
`;
module.exports=typeDefs
