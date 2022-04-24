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
  const contextData: IContext = { dataLoader };

  if (accessToken) {
    const user = verifyAccessToken(accessToken);
    if (user?.tokenExpired || user?.tokenInvalid) {
      contextData.user = null;
    } else {
      contextData.user = user;
    }
  }
  return contextData;
};
