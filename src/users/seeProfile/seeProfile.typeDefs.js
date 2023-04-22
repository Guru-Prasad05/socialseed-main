const {gql} = require("apollo-server-express"); 

const typeDefs= gql`
  type Query {
    seeProfile(username:String!): User
  }
`;

module.exports=typeDefs