import { AuthPayload, ResolversTypes, SignUpInput, User } from "../../generatedTypes/graphql";
import { companyModel, userModel,roleModel } from "@models/index";
import {Types} from 'mongoose'
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
        }
    }
}
