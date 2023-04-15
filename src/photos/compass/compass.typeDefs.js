const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
  type Query {
    compass(lastId:Int): [Photo]
  }
`;
module.exports=typeDefs