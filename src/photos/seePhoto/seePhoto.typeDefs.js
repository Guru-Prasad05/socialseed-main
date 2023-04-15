const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
    type Query{
        seePhoto(id:Int!):Photo
    }
`
module.exports=typeDefs