import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    likes: Int!
    commentNumber: Int!
    comments: [Comment]
    hashtags: [Hashtag]
    createAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photo(page: Int): [Photo]
    totalPhotos: Int!
    createAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createAt: String!
    updatedAt: String!
  }
`;
