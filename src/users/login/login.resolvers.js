const client =require ("../../client");
const bcrypt = require("bcrypt");
const  jwt  = require("jsonwebtoken");

module.exports= {
  Mutation: {
    login: async (_, { username, password }) => {
      //find user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      //check password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect Username or Password",
        };
      }

      //issue token
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token: token,
      };
    },
  },
};
