const client =require ("../../client");


module.exports= {
  Query: {
    seeFollowers: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      
      const followersResult = await client.follower
        .findMany({ where: { followerId:ok.id }, 
          select:{user:true},
          })
      
      return {
        ok: true,
        followers:followersResult,
      };
    },
  },
};
