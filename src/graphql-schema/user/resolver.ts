import { Resolvers } from '../../generated/graphql';
import { userModel } from '@models/index';
import { generateAccessToken, generateRefreshToken } from '@lib/jwt';
import { IContext } from '@lib/context';

const resolvers: Resolvers<IContext> = {
  Query: {
    users: async () => {
      const users = await userModel.find().select('-password -generatedID');
      return users;
    },
  },
  User: {
    company: async ({ company }, _, { dataLoader }) => {
      // the dataloader - one to one
      const companies = await dataLoader.company.load(company);
      return companies;
      // the old way
      // return await companyModel.findById(company)
    },
    roles: async ({ roles }, _, { dataLoader }) => {
      // the dataloader - one to many
      const userRoles = await dataLoader.role.loadMany(roles);
      return userRoles;
      // the old way
      // let data= await roleModel.find({ _id: { $in: roles } })
      // return data
    },
  },
  Mutation: {
    signUp: async (_, { input }) => {
      // eslint-disable-next-line new-cap
      const user = new userModel(input);
      const newUser = await user.save();
      return newUser;
    },
    signIn: async (_, { input }) => {
      const user = await userModel
        .findOne({ email: input.email })
        .populate('roles');
      if (!user) {
        throw new Error('User not found');
      }
      if (user.password !== input.password) {
        throw new Error('Password is incorrect');
      }
      // creating a new array of roles to make payload
      let { roles } = user as any;
      roles = Array.isArray(roles) && roles.map((role) => role.role);
      // eslint-disable-next-line no-underscore-dangle
      const accessTokenPayload = { userId: user?._id, roles };
      const refreshTokenPayload = {
        // eslint-disable-next-line no-underscore-dangle
        userId: user._id,
        generatedID: user.generatedID,
      };
      return {
        accessToken: `Bearer ${generateAccessToken(accessTokenPayload)}`,
        refreshToken: `Bearer ${generateRefreshToken(refreshTokenPayload)}`,
        user,
      };
    },
  },
};
export default resolvers;
