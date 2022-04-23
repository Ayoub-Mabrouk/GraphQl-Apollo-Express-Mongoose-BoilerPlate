import { Schema, model } from 'mongoose';

interface ICompany {
  name: string;
}

const companySchema = new Schema<ICompany>(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const companyModel = model<ICompany>('Company', companySchema);
export default companyModel;
