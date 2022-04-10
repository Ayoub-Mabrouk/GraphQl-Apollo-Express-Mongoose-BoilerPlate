import { AuthPayload, ResolversTypes, SignUpInput, User } from "../../generated/graphql";
import { companyModel, userModel,roleModel } from "@models/index";
import {Types} from 'mongoose'
import { SignInInput } from "generated/graphql";
export const resolvers = {
    Query: {
        users: async () => {
         return await userModel.find().then(data => data.map(user => { user.password = undefined; return user }))}
    },
    User: {
        company:async ({company}:{company:Types.ObjectId}) =>await companyModel.findById(company),
        roles:async ({roles}:{roles:Types.ObjectId}) =>await roleModel.find({ _id: { $in: roles } })
    },
    Mutation: {
        signUp: async (_: any, { input }: { input: SignUpInput }) => {
            const user = new userModel(input);
            return await user.save();
        },
        signIn: async (_: any, { input }: { input: SignInInput }) => {
            const user = await userModel.findOne({ email: input.email });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.password !== input.password) {
                throw new Error("Password is incorrect");
            }
            return {
                token: "token",
                user
            };
        }
    }
}
