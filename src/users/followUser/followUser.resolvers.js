const client = require("../../client");
const { protectedResolvers } = require("../../users/users.utils");

module.exports = {
  Mutation: {
    followUser: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const ok = await client.user.findUnique({ where: { id } });
      if (!ok) {
        return {
          ok: false,
          error: "This user doesn't exist.",
        };
      }
      await client.follower.create({
        data: {
          userId: { connect: { id: loggedInUser.id } },
          followerId: { connect: { id } },
        },
      });
      return {
        ok: true,
        id,
      };
    }),
  },
};
