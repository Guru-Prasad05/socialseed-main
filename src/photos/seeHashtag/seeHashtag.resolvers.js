const client =require ("../../client");


module.exports= {
  Query: {
    seeHashtag: (_, { hashtag}) =>
      client.hashtag.findUnique({ where: { hashtag } }),
  },

};
