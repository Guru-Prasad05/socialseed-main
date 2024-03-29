const client =require ("../../client");
const { protectedResolvers } =require ("../../users/users.utils");

module.exports= {
  Mutation: {
    editComment: protectedResolvers(
      async (_, { id, payload }, { loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment) {
          return {
            ok: false,
            error: "Comment not found.",
          };
        } else if (comment.userId !== loggedInUser.id) {
          console.log(comment.userId);
          return {
            ok: false,
            error: "Not Authorized.",
          };
        } else {
          await client.comment.update({ where: { id }, data: { payload } });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
