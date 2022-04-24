import { companyModel } from '../../models';
import {
  Company,
  CompanyInput,
  CompanyUpdateInput,
} from '../../generated/graphql';

const resolvers = {
  Query: {
    companies: async () => {
      const companies = await companyModel.find();
      return companies;
    },
  },
  Mutation: {
    createCompany: async (_: any, { input }: { input: CompanyInput }) => {
      // eslint-disable-next-line new-cap
      const company = new companyModel(input);
      const saveCompany = await company.save();
      return saveCompany;
    },
    updateCompany: async (
      _: any,
      { input: { id, name } }: { input: CompanyUpdateInput },
    ): Promise<Company | null> => {
      const updateCompany = (await companyModel.findByIdAndUpdate(
        id,
        { name },
        { new: true },
      )) as Company | null;
      return updateCompany;
    },
  },
};
export default resolvers;
