import { Request } from "express";
import { verifyAccessToken } from "./jwt";
import dataLoader from "./dataloader";
import { JwtPayload } from "jsonwebtoken";
interface IContext {
    user?: void | JwtPayload | null,
    dataLoader: typeof dataLoader
}
export const context = ({ req }: { req: Request }) => {

    // get the user tokens from the headers
    const accessToken = (req.headers.authorization || '').replace('Bearer ', '');
    const refreshToken = req.headers['x-refresh-token'] || '';

    let contextData: IContext= { dataLoader }
    // try to retrieve a user with the received jwt        
    if (accessToken) {
        const user = verifyAccessToken(accessToken);
        if (user?.tokenExpired || user?.tokenInvalid) {
            contextData.user = null;
        }
        else {
            contextData.user = user;
        }
    }
    return contextData;
};

