import { errorHandler } from "../../Utils/ErrorHandler";
import mongoose from 'mongoose';
import { ENV_VARIABLES } from "../../serverConfig";

/**
 * 
 * @param connectionString 
 * @param poolSize default is 10
 * @returns void
 */
export const initMongoDB = (poolSize?: number): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            mongoose.connection.on("error", (error) => {
                errorHandler(null, error);
            });

            mongoose.connection.on("disconnected", () => {
                errorHandler(null, { status: 0, message: "mongodb disconnected" });
            });

            mongoose.connection.on('connected', () => {
                console.log('Mongo Db connected')
            });

            const mongoDB = ENV_VARIABLES.MongoDB;
            const connectionString = mongoDB.CONNECTION_STRING ? mongoDB.CONNECTION_STRING : `mongodb://${mongoDB.USER_NAME}:${mongoDB.DATA_BASE_PASSWORD}@${mongoDB.HOST}/${mongoDB.DATA_BASE_NAME}?authSource=admin`
            await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                maxPoolSize: poolSize || 10
            });
            resolve();
        } catch (error) {
            errorHandler(reject, error);
        }
    });
};