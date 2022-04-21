import { Request } from "express";
import { verifyAccessToken } from "./jwt";
import dataLoader from "./dataloader";
import { JwtPayload } from "jsonwebtoken";
export interface IContext {
    user?: void | JwtPayload | null,
    dataLoader?: typeof dataLoader
}
export const context = ({ req }: { req: Request }) => {

    const getTokens = () => {
        const accessToken = (req.headers.authorization || '').replace('Bearer ', '');
        const refreshToken = req.headers['x-refresh-token'] || '';
        return { accessToken, refreshToken };
    }

    const {accessToken,refreshToken} =getTokens()
   

    // creating a new context object so i can add properties to it later based on some conditions
    let contextData: IContext = {}

    // try to retrieve a user with the received jwt        
    if (accessToken) {
        const user = verifyAccessToken(accessToken);
        if (user?.tokenExpired || user?.tokenInvalid) {
            contextData.user = null;
        }
        // if the user is valid, add it to the context and add the dataloader
        else {
            contextData = {
                user, dataLoader
            }
        }
    }
    return contextData;
};

