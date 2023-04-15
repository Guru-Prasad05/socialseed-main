const {gql} = require("apollo-server-express");

const typeDefs=gql`
  type MutationResponse {
    ok: Boolean!
    id: Int
    error: String
  }
`;
module.exports=typeDefs