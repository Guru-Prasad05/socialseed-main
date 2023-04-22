const client = require("../../client");
const { protectedResolvers } = require("../../users/users.utils");

module.exports = {
  Mutation: {
    unfollowUser: protectedResolvers(
      async (_, { username }, { loggedInUser }) => {
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        console.log(ok);
        if (!ok) {
          return {
            ok: false,
            error: "Can't unfollow user.",
          };
        }
        await client.follower.deleteMany({
          where: { userId: loggedInUser.id, followerId: ok.id },
        });
        return {
          ok: true,
          id: ok.id,
        };
      }
    ),
  },
};
