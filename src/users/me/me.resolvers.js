const client =require ("../../client");
const { protectedResolvers } =require ("../../users/users.utils");

module.exports= {
  Query: {
    me: protectedResolvers((_, __, { loggedInUser }) =>
      client.user.findUnique({ where: { id: loggedInUser.id } })
    ),
  },
};
