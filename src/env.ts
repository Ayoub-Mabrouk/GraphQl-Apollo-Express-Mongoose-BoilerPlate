require("dotenv").config();
export const ENV_VARS = {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    PORT: process.env.PORT || 8000,
    jwtSecret : Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64")
}