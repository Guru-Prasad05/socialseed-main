const {gql} = require("apollo-server-express");

const typeDefs=gql`
    type Mutation{
        sendMessage(payload:String!,roomId:Int,userId:Int):MutationResponse!
    }
`
module.exports=typeDefs