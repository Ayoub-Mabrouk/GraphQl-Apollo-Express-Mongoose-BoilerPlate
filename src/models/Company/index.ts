import { Schema, model } from 'mongoose';

export interface ICompany {
  id: string;
  name: string;
}

const companySchema = new Schema<ICompany>(
  {
    name: { type: String },
  },
  { timestamps: true },
);

const companyModel = model<ICompany>('Company', companySchema);
export default companyModel;
