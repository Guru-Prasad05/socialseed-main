const client =require ("../../client");
const { protectedResolvers } =require ("../../users/users.utils");

module.exports= {
  Query: {
    seeRooms: protectedResolvers(async (_, __, { loggedInUser }) =>
      client.room.findMany({
        where: {
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};
