const client =require ("../../client");
const { protectedResolvers } =require ("../../users/users.utils");

module.exports= {
  Mutation: {
    deletePhoto: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!photo) {
        return {
          ok: false,
          erorr: "Photo not found",
        };
      } else if (photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not Authorized",
        };
      } else {
        await client.photo.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    }),
  },
};
