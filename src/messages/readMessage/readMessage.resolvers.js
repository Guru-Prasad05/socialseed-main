const client =require ("../../client");
const { protectedResolvers } =require ("../../users/users.utils");

module.exports= {
  Mutation: {
    readMessage: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const message = await client.message.findFirst({
        where: {
          id,
          userId: {
            not: loggedInUser.id,
          },
          room: {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
      if (!message) {
        return {
          ok: false,
          error: "Message not found",
        };
      }
      await client.message.update({ where: { id }, data: { read: true } });
      return {
        ok: true,
      };
    }),
  },
};
