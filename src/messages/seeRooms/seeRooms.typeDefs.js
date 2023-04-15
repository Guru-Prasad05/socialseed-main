const {gql} = require("apollo-server-express");

 const typeDefs=gql`
    type Query{
        seeRooms:[Room]
    }
`

module.exports=typeDefs