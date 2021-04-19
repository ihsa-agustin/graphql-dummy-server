import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import cors from "cors"
import { PrestadoresResolver } from "./resolvers/PrestadoresResolver";

(async () => {
  const app = express();

  app.use(cors())

  await createConnection();

  try {
    var schema = await buildSchema({
      resolvers: [UserResolver, PrestadoresResolver]
    })
  } catch (e) {
    console.error(e)
    throw e
  }

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();
