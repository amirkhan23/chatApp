export const ENV_VARIABLES = {
    SERVER_PORT: Number(process.env.SERVER_PORT || 5001),
    MongoDB: {
        HOST: process.env.MONGO_DB_HOST || 5001,
        USER_NAME: process.env.MONGO_DB_USER_NAME || "",
        DATA_BASE_PASSWORD: process.env.MONGO_DB_PASSWORD || "",
        DATA_BASE_NAME: process.env.MONGO_DB_NAME || "",
        CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING
    },
    JWT_KEY: process.env.JWT_KEY || ""
}