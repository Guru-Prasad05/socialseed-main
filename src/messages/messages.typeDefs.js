const {gql} = require("apollo-server-express");

const typeDefs=gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    read: Boolean!
    createAt: String!
    updateAt: String!
  }
  type Room {
    id: Int!
    unreadTotal: Int!
    users: [User]
    messages: [Message]
    createAt: String!
    updateAt: String!
  }
`;

module.exports =typeDefs
