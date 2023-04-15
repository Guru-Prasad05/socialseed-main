const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
  type Query {
    seeHashtag(hashtag: String!): Hashtag
  }
`;
module.exports=typeDefs