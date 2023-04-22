const client = require("../../client");
const { protectedResolvers } = require("../users.utils");

module.exports = {
  Mutation: {
    removeFollower: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const followerDetails = await client.user.findUnique({ where: { id } });
      if (!followerDetails) {
        return {
          ok: false,
          error: "Can't remove user.",
        };
      }
      
      await client.follower.deleteMany({
        where: { followerId:loggedInUser.id, userId:followerDetails.id },
      });
      return {
        ok: true,
        id:followerDetails.id
      };
    }),
  },
};
