import { Request } from 'express';

const getTokens = (req: Request) => {
  const accessToken = (req.headers.authorization || '').replace('Bearer ', '');
  const refreshToken = req.headers['x-refresh-token'] || '';
  return { accessToken, refreshToken };
};
export default getTokens;
