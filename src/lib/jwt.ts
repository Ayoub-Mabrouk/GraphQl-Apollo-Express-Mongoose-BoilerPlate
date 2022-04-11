import jwt, { sign, verify, SignOptions, VerifyOptions, JsonWebTokenError, TokenExpiredError, JwtPayload, VerifyErrors, Jwt } from "jsonwebtoken";
import { Types } from 'mongoose'
import { env } from "process";
import { ENV_VARS } from "../env";

//generate access token
export const generateAccessToken = (payload: { userId: Types.ObjectId }) => sign(payload, ENV_VARS.jwtSecret, { expiresIn: ENV_VARS.access_jwt_expiresIN, algorithm: ENV_VARS.access_jwt_algorithm } as SignOptions)

//generate refresh token
export const generateRefreshToken = (payload: { userId: Types.ObjectId, generatedID: string }) => sign(payload, ENV_VARS.jwtSecret, { expiresIn: ENV_VARS.refresh_jwt_expiresIN, algorithm: ENV_VARS.refresh_jwt_algorithm } as SignOptions);

//verify access token
export const verifyAccessToken = (token: string):JwtPayload|null|void => {
  
        return verify(token, ENV_VARS.jwtSecret, { algorithms: [ENV_VARS.access_jwt_algorithm] } as VerifyOptions, (error, payload) => {
            return error ?
                error.name == "TokenExpiredError" ?
                    { tokenExpired: true } : { tokenInvalid: true }
                : payload
            }
        )

}

//verify refresh token
export const verifyRefreshToken = (token: string) => verify(token, ENV_VARS.jwtSecret, { algorithm: ENV_VARS.refresh_jwt_algorithm } as SignOptions);