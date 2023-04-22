const client = require("../../client");

module.exports = {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
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
      
      const followings = await client.follower.findMany({
        where: { userId: ok.id },
        select:{follower:true},
      });
      
      return {
        ok: true,
        following:followings,
      };
    },
  },
};
