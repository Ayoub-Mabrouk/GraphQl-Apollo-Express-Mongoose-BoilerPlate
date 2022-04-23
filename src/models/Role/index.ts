import { Schema, model } from 'mongoose';

interface IRole {
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
