const client = require("../../client");
const { protectedResolvers } = require("../../users/users.utils");

module.exports = {
  Query: {
    seeFeed: protectedResolvers((_, __, { loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                following: {
                  some: {
                    userId: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createAt: "desc",
        },
      })
    ),
  },
};
