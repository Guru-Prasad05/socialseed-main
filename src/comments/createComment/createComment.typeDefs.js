const {gql} = require("apollo-server-express");
 const typeDefs=gql`
 type CommentResponse{
    ok:String!
    error:String
    id:Int
    createAt:String
 }
  type Mutation {
    createComment(photoId: Int!, payload: String!): CommentResponse!
  }
`;

module.exports=typeDefs
