import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyAccessToken } from './jwt';
import dataLoader from './dataloader';
import getTokens from 'helpers/getTokens';

export interface IContext {
  user?: void | JwtPayload | null;
  dataLoader: typeof dataLoader;
}
export const context = ({ req }: { req: Request }) => {
  const { accessToken } = getTokens(req);
  // creating a new context object so i can add properties to it later based on some conditions
  const contextData: IContext = { dataLoader };

  // try to retrieve a user with the received jwt
  if (accessToken) {
    const user = verifyAccessToken(accessToken);
    if (user?.tokenExpired || user?.tokenInvalid) {
      contextData.user = null;
    }
    // if the user is valid, add it to the context and add the dataloader
    else {
      contextData.user = user;
    }
  }
  return contextData;
};
