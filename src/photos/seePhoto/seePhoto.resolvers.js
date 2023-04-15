const client =require ("../../client");


module.exports= {
  Query: {
    seePhoto: (_, { id }) => client.photo.findUnique({ where: { id } }),
  },
};
