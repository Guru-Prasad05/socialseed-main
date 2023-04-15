const {gql} = require("apollo-server-express"); 

const typeDefs= gql`
    type Query{
        seeFeed:[Photo]
    }
`
module.exports=typeDefs