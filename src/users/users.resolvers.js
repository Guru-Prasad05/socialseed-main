const client = require("../client");

module.exports = {
  User: {
    totalFollowing: ({ id }) =>
      client.follower.count({
        where: { userId: id },
      }),

    totalFollowers: ({ id }) =>
      client.follower.count({
        where: {
          followerId: id,
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          id,
          following: { some: { userId: loggedInUser.id } },
        },
      });
      console.log(exists);
      return Boolean(exists);
    },
    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
  },
};
