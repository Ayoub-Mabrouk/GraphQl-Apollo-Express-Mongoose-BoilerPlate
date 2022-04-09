//Environment Variables
import {ENV_VARS}  from './env'
import { schema } from './graphql-schema';
import { dbConnection } from './database/connection';
import { ApolloServer, gql }  from "apollo-server-express"
import { makeExecutableSchema } from '@graphql-tools/schema';
import fs  from "fs"
import bodyParser  from "body-parser"
import cors  from "cors"
import expressJwt  from "express-jwt";
import jwt  from "jsonwebtoken"

import express, {Request,Response,Application} from 'express';
const app:Application = express();
app.use(
  cors(),
  bodyParser.json(),
  expressJwt({
  secret: ENV_VARS.jwtSecret,
  credentialsRequired: false,
  algorithms: []
}),
);

async function startServer() {
  const apolloServer = new ApolloServer({
    schema
  });
  
  await apolloServer.start();
  await dbConnection();
  apolloServer.applyMiddleware({ app, path: "/graphql" });
}
startServer();

app.get("/", (req:Request, res:Response):void => {
    res.send("Hello Typescript with Node.js!")
  });

  app.listen(ENV_VARS.PORT, ():void => {
    console.log(`Server Running here 👉 https://localhost:${ENV_VARS.PORT}`);    
  });