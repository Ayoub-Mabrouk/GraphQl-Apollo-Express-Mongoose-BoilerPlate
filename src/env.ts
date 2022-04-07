require("dotenv").config();
export const ENV_VARS = {
    db_user: process.env.DB_USER,
    db_name: process.env.DB_NAME,
    db_password: process.env.DB_PASSWORD,
    db_cluster: process.env.DB_CLUSTER,
    PORT: process.env.PORT || 8000,
    jwtSecret : Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64")
}