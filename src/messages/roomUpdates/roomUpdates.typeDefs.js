const {gql} = require("apollo-server-express");

const typeDefs=gql`
  type Subscription {
    roomUpdates(id:Int!): Message
  }
`;
module.exports=typeDefs