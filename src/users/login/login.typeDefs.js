const {gql} = require("apollo-server-express"); 

 const typeDefs=gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }
`;

module.exports=typeDefs