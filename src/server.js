if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const http = require("http");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const { typeDefs, resolvers } = require("./schema");
const { getUser } = require("./users/users.utils.js");
const PORT = process.env.PORT;



const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
  playground: true,
  introspection: true,
});

const app = express();
app.use(logger("tiny"));
app.use(cors());
app.use(
  "/graphql",
  graphqlUploadExpress({
    maxFileSize: 10000000,
    maxFiles: 10,
  }),
);
apollo.applyMiddleware({ app, bodyParserConfig: {}, uploads: false });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
