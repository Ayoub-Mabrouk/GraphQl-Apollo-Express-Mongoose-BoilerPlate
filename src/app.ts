// Environment Variables
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response, Application } from 'express';
import depthLimit from 'graphql-depth-limit';
import dbConnection from './database/connection';
import schema from './graphql-schema';
import { context } from '@lib/context';
import ENV_VARS from './env';

const app: Application = express();
app.use(cors(), bodyParser.json());

async function startServer() {
  const apolloServer = new ApolloServer({
    schema,
    context,
    validationRules: [depthLimit(7)],
  });
  await apolloServer.start();
  await dbConnection();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
}
startServer();
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello Typescript with Node.js!');
});
app.listen(ENV_VARS.PORT, (): void => {
  console.log(
    `GraphQl Server Running here 👉 http://localhost:${ENV_VARS.PORT}/graphql`,
  );
});
