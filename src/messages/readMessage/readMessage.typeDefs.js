const {gql} = require("apollo-server-express");

const typeDefs=gql`
    type Mutation{
        readMessage(id:Int!):MutationResponse!
    }
`

module.exports=typeDefs