const {gql} = require("apollo-server-express"); 

const typeDefs=gql`
    type Query{
    seePhotoComments(id:Int!,page:Int):[Comment]
}
`;

module.exports=typeDefs