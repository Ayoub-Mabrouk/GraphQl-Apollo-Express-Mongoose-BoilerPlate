import { Schema, model, Types } from 'mongoose';
import validator from 'validator';

interface IUser {
  firstName: string;
  lastName: string;
  password: string | undefined;
  generatedID: string;
  email: string;
  roles: Types.ObjectId[];
  company: Types.ObjectId;
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
  { timestamps: true }
);

const userModel = model<IUser>('User', userSchema);
export default userModel;
