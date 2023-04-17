const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
    scalar Upload
    type Mutation{
        uploadPhoto(file:Upload!, caption:String):Photo
    }
`
module.exports=typeDefs