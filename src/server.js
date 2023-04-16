if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const http =require ("http")
const  express = require( "express");
const cors=require("cors")
const logger =require( "morgan");
const  { ApolloServer} =require("apollo-server-express");
const  {typeDefs, resolvers}  = require ("./schema");
const { getUser } = require("./users/users.utils.js");
const PORT = process.env.PORT;


const apollo = new ApolloServer({
 typeDefs,
 resolvers,
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
app.use(cors())
apollo.applyMiddleware({ app });


const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
