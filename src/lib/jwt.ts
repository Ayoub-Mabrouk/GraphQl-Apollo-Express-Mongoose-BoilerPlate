import { sign, verify,SignOptions } from "jsonwebtoken";
import { env } from "process";
import { ENV_VARS } from "../env";

//generate access token
export const generateAccessToken = (payload: any) => sign(payload, ENV_VARS.jwtSecret, { expiresIn: ENV_VARS.access_jwt_expiresIN, algorithm:ENV_VARS.access_jwt_algorithm } as SignOptions)

//generate refresh token
export const generateRefreshToken = (payload: any) => sign(payload, ENV_VARS.jwtSecret,{ expiresIn: ENV_VARS.refresh_jwt_expiresIN, algorithm: ENV_VARS.refresh_jwt_algorithm } as SignOptions);

