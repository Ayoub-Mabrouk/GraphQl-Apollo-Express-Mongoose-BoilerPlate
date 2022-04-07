import { Schema, model } from "mongoose"
// interface ICompany {
//     name: string
// }

const companySchema = new Schema(
    {
        name: { type: String }
    },
    { timestamps: true }
)

export const companyModel= model("Company", companySchema);