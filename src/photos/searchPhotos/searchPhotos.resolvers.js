const client =require ("../../client");


module.exports= {
  Query: {
    searchPhotos: (_, { keyword }) =>
      client.photo.findMany({ where: { caption: { startsWith: keyword } } }),
  },
};
