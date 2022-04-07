import { Schema, model,Types } from "mongoose"
import validator from "validator";

interface IUser {
    firstName: string
    lastName: string
    password: string
    email: string
    company: Types.ObjectId
}

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String },
        lastName: { type: String },
        password: { type: String },
        email: {
            type: String,
            required: [true, "Please fill your email"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, " Please provide a valid email"],
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: "Company",
        }
    },
    { timestamps: true }
)

export const userModel= model<IUser>("User", userSchema);