import { Schema, model } from 'mongoose';
import validator from 'validator';
import { ICompany } from '@models/Company';
import { IRole } from '@models/Role';

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  generatedID: string;
  email: string;
  roles: IRole[];
  company: ICompany;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    generatedID: { type: String },
    email: {
      type: String,
      required: [true, 'Please fill your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, ' Please provide a valid email'],
    },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
  },
  { timestamps: true },
);

const userModel = model<IUser>('User', userSchema);
export default userModel;
