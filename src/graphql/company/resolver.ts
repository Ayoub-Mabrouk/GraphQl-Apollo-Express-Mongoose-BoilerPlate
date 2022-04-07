import { companyModel } from "../../models";
import { Company, CompanyInput, CompanyUpdateInput } from "../../generatedTypes/graphql";
export const resolvers = {
    Query: {
        companies: async () => {
            return await companyModel.find()
        }
    },
    Mutation: {
        createCompany: async (_: any, { input }: {input:CompanyInput}) => {    
                    
            const company = new companyModel(input);
            return await company.save();
        },
        updateCompany: async (_: any, { input:{id,name} }: {input:CompanyUpdateInput}) :Promise<Company|null> => {
             return await companyModel.findByIdAndUpdate(id, { name }, { new: true });
        }
    }
}
