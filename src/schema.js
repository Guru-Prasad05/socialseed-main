

const path =require("path");
const { mergeTypeDefs, mergeResolvers } =require( "@graphql-tools/merge");
const { loadFilesSync } =require( "@graphql-tools/load-files");


const loadedTypes = loadFilesSync(path.join(__dirname,"/**/*.typeDefs.js"));
const loadedResolvers = loadFilesSync(path.join(__dirname,"/**/*.resolvers.js"));

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);




module.exports={
    typeDefs,
    resolvers
}