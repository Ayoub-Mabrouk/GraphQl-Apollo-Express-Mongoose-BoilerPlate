import { Schema, model } from "mongoose"
import validator from "validator";

const userSchema = new Schema(
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

export const userModel = model("User", userSchema);