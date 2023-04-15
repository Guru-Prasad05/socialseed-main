const {gql} = require("apollo-server-express"); 

const typeDefs= gql`
  type Query {
    searchUsers(keyword: String!, lastId:Int): [User]
  }
`;

module.exports=typeDefs