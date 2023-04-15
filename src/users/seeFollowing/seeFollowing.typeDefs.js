const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
    type seeFollowingResult{
        ok:Boolean!
        error:String
        following: [User]
    }
     type Query{
        seeFollowing(username:String!, lastId:Int):seeFollowingResult
     }
`
module.exports=typeDefs