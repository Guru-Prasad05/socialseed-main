const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
    type Query{
        searchPhotos(keyword:String!):[Photo]
    }
`
module.exports=typeDefs