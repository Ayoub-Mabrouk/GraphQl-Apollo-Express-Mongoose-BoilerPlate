import { Schema, model } from "mongoose"
interface ICompany {
    name: string
}

const companySchema = new Schema<ICompany>(
    {
        name: { type: String }
    },
    { timestamps: true }
)

export const companyModel= model<ICompany>("Company", companySchema);