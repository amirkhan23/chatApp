import { UserRole } from "../../Constants/Constants";
import { SchemaNames } from "./SchemaName";

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        groupId: {
            type: String,
            required: true,
            index: true
        },
        userId: {
            type: String,
            required: true,
            index: true
        },
        message: {
            type: String
        },
        createdAt: {
            type: Number,
            default: Date.now()
        }
    }
);

export const MessageSchemaModel = mongoose.model(SchemaNames.MESSAGES, MessageSchema);

export async function saveMessage(groupId: string, userId: string, message: string): Promise<any> {
    const msg = await MessageSchemaModel.create({ groupId, message, userId });
    return Promise.resolve(msg);
}

export async function getAllMessagesOfGroup(groupId: string): Promise<any> {
    const filter = { groupId }
    const groups = await MessageSchemaModel.find(filter).sort({ updatedAt: -1 }).lean(true);
    return Promise.resolve(groups);
}
