const {gql} = require("apollo-server-express");
const typeDefs=gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: String
    photos: [Photo]
    followers: [Follower!]!
    following: [Follower!]!
    createAt: String!
    updatedAt: String!
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
  type Follower{
    id:Int!
    user:User!
    userId: Int!
    follower:User!
    followerId:Int!
  }
`;

module.exports=typeDefs