import { Request } from "express";
import { verifyAccessToken } from "./jwt";
export const context = ({ req }: { req: Request }) => {
    // get the user tokens from the headers
    const accessToken = (req.headers.authorization || '').replace('Bearer ', '');
    const refreshToken = req.headers['x-refresh-token'] || '';

    // try to retrieve a user with the received jwt        
    if (accessToken) {
        const user = verifyAccessToken(accessToken);
        // console.log(user);
        
        if (user?.tokenExpired) {
            return { user };
        }
    }
    return null
};

