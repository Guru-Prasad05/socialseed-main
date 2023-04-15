const client = require("../../client");
const { protectedResolvers } =require ("../../users/users.utils");

module.exports= {
  Mutation: {
    deleteComment: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!comment) {
        return {
          ok: false,
          error: "Comment not found",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not Authorized",
        };
      } else {
        await client.comment.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    }),
  },
};
