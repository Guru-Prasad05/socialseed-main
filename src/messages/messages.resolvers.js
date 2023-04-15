const client = require("../client");

module.exports= {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) => client.message.findMany({ where: { roomId: id } }), //pagination
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      } else {
        return client.message.count({
          where: {
            read: false,
            roomId: id,
            user: {
              id: {
                not: loggedInUser.id,
              },
            },
          },
        });
      }
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
