import { gql } from "apollo-server-express";

export default gql`
type EditMutationResponse{
    ok:String!
    error:String
    avatar:String
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
