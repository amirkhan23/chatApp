import { UserRole } from "../../Constants/Constants";
import { SchemaNames } from "./SchemaName";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: [UserRole.ADMIN, UserRole.NORMAL],
            default: UserRole.NORMAL
        },
        createdAt: {
            type: Number,
            default: Date.now()
        },
        updatedAt: {
            type: Number,
            default: Date.now()
        }
    }
);

export const UserSchemaModel = mongoose.model(SchemaNames.USER, UserSchema);

export async function createUser(userName: string, password: string): Promise<any> {
    const user = await UserSchemaModel.create({ userName, password });
    return Promise.resolve(user);
}

export async function getUserByUserName(userName: string): Promise<any> {
    const user = await UserSchemaModel.findOne({ userName }).lean(true);
    return Promise.resolve(user);
}