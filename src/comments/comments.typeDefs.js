const { gql } = require ("apollo-server-express");

const typeDefs=gql`
    type Comment{
        id:Int!
        user:User!
        photo:Photo!
        payload:String!
        isMine:Boolean!
        createAt:String!
        updateAt:String
    }
`
module.exports=typeDefs