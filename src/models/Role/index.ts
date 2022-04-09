import { Schema, model,Types } from "mongoose"
import validator from "validator";

interface IRole {
    role: string
}

const roleSchema = new Schema<IRole>(
    {
        role: { type: String , required: true},
    },
    { timestamps: true }
)

export const roleModel= model<IRole>("Role", roleSchema);