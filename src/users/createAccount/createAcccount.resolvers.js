const client =require ("../../client");

const bcrypt = require ("bcrypt");

module.exports= {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          throw new Error("this username or password is already taken");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: hashPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
