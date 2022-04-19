import { Company, SignUpInput } from "../../generated/graphql";
import { companyModel, userModel, roleModel } from "@models/index";
import { Types } from 'mongoose'
import { SignInInput } from "generated/graphql";
import { generateAccessToken, generateRefreshToken } from "@lib/jwt";
export const resolvers = {
    Query: {
        users: async () => {
            return await userModel.find().then(data => data.map(user => { user.password = undefined; return user }))
        }
    },
    User: {
        company: async ({ company }: { company: Types.ObjectId }, _:any,{dataLoader}): Promise<Company | null> => {
            return await dataLoader.company.load(company)
            // return await companyModel.findById(company)
        },
        roles: async ({ roles }: { roles: Types.ObjectId }) => await roleModel.find({ _id: { $in: roles } })
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
