import { companyModel } from "../../models";
export const resolvers = {
    Query: {
        companies: async () => {
            return await companyModel.find()
          }
      },
}
