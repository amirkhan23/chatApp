import { JWT_TOKEN_EXPIRED_TIME_IN_SEC } from "../../Constants/CommonConstants";
import { SchemaNames } from "./SchemaName";

import mongoose from "mongoose";

const JWTBlacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            index: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: JWT_TOKEN_EXPIRED_TIME_IN_SEC,
        }
    }
);

export const JWTBlacklistModel = mongoose.model(SchemaNames.JWTBlacklist, JWTBlacklistSchema);

export async function blackListToken(JWTToken: string): Promise<boolean> {
    await JWTBlacklistModel.create({ token: JWTToken });
    return Promise.resolve(true);
}

export async function isBlackListToken(JWTToken: string): Promise<boolean> {
    const token = await JWTBlacklistModel.findOne({ token: JWTToken }).lean(true);
    return Promise.resolve(token ? true : false);
}