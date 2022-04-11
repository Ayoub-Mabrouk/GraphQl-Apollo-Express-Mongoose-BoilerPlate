require("dotenv").config();
export const ENV_VARS = {
    db_user: process.env.DB_USER,
    db_name: process.env.DB_NAME,
    db_password: process.env.DB_PASSWORD,
    db_cluster: process.env.DB_CLUSTER,
    PORT: process.env.PORT || 8000,
    jwtSecret :"mysecret",
    access_jwt_expiresIN:process.env.ACCESS_JWT_EXPIRES_IN || "1h",
    refresh_jwt_expiresIN:process.env.REFRESH_JWT_EXPIRES_IN || "1d",
    access_jwt_algorithm:process.env.ACCESS_JWT_ALGORITHM || "HS256",
    refresh_jwt_algorithm:process.env.REFRESH_JWT_ALGORITHM || "HS256",
}