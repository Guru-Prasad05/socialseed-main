const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
    type SeeFollowersResult{
        ok:Boolean!
        error:String
        followers:[User]
        totalPages:Int
    }
    type Query{
        seeFollowers(username:String!,page:Int!):SeeFollowersResult! 
    }
`
module.exports=typeDefs