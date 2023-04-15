const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
    type Query{
        seePhotoLikes(id:Int!):[User]
    }
`
module.exports=typeDefs