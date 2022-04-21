import { Company, SignUpInput } from "../../generated/graphql";
import { companyModel, userModel } from "@models/index";
import { Types } from 'mongoose'
import { SignInInput ,Resolvers} from "generated/graphql";
import { generateAccessToken, generateRefreshToken } from "@lib/jwt";
import { IContext } from "@lib/context";
export const resolvers = {
    Query: {
        users: async () => {
            return await userModel.find().then(data => data.map(user => { user.password = undefined; return user }))
        }
    },
    User: {
        company: async ({ company }: { company: Types.ObjectId }, _: any, { dataLoader }: IContext): Promise<Company | null> => {
            // the dataloader - one to one
            return await dataLoader?.company.load(company)
            // the old way
            // return await companyModel.findById(company)
        },
        roles: async ({ roles }: { roles: Types.ObjectId[] }, _: any, { dataLoader }: IContext) => {
            // the dataloader - one to many
            return await dataLoader?.role.loadMany(roles)
            // the old way
            // let data= await roleModel.find({ _id: { $in: roles } })
            // return data
        }
    },
    Mutation: {
        signUp: async (_: any, { input }: { input: SignUpInput }) => {
            const user = new userModel(input);
            return await user.save();
        },
        signIn: async (_: any, { input }: { input: SignInInput }) => {
            const user = await userModel.findOne({ email: input.email }).populate("roles")
            if (!user) {
                throw new Error("User not found");
            }
            if (user.password !== input.password) {
                throw new Error("Password is incorrect");
            }
            //creating a new array of roles to make payload
            let { roles } = user as any
            roles = Array.isArray(roles) && roles.map(role => role.role)
            let accessTokenPayload = { userId: user?._id, roles }
            let refreshTokenPayload = { userId: user._id, generatedID: user.generatedID }
            return {
                accessToken: `Bearer ${generateAccessToken(accessTokenPayload)}`,
                refreshToken: `Bearer ${generateRefreshToken(refreshTokenPayload)}`,
                user
            };
        }
    }
}
