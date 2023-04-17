const { gql } = require("apollo-server-express");


const typeDefs = gql`
  scalar Upload
  type EditMutationResponse {
    ok: String!
    error: String
    avatar: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): EditMutationResponse!
  }
`;

module.exports = typeDefs;
