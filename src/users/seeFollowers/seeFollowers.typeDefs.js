const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
    type SeeFollowersResult{
        ok:Boolean!
        error:String
        followers:[Follower]
    }
    type Query{
        seeFollowers(username:String!,lastId:Int):SeeFollowersResult! 
    }
`
module.exports=typeDefs