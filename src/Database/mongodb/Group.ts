import { UserRole } from "../../Constants/Constants";
import { SchemaNames } from "./SchemaName";

const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            required: true,
            index: true
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

export const GroupSchemaModel = mongoose.model(SchemaNames.GROUP, GroupSchema);

export async function createGroup(groupName: string): Promise<any> {
    const group = await GroupSchemaModel.create({ groupName });
    return Promise.resolve(group);
}

export async function getAllGroup(pageNo: number, limit: number, _id?: string): Promise<any> {
    try {
        const filter = {}
        if (_id) {
            (filter as any)["_id"] = _id;
        }
        const groups = await GroupSchemaModel.find(filter).skip((pageNo - 1) * limit).limit(limit).sort({ updatedAt: -1 }).lean(true);
        return Promise.resolve(groups);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}