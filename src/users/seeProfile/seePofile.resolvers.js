const client = require("../../client");

module.exports = {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};
