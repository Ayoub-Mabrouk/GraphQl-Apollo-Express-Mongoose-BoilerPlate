import { Schema, model } from "mongoose"

const companySchema = new Schema(
    {
        name: { type: String }
    },
    { timestamps: true }
)

export const companyModel = model("Company", companySchema);