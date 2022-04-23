import { Schema, model } from 'mongoose';

export interface IRole {
  id: string;
  role: string;
}

const roleSchema = new Schema<IRole>(
  {
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const roleModel = model<IRole>('Role', roleSchema);
export default roleModel;
