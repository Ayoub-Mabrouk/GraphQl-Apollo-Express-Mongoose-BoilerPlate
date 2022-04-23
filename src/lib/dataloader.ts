import DataLoader from 'dataloader';
import { Model } from 'mongoose';
import { companyModel, roleModel } from '@models/index';

const newLoader = (model: Model<any>) => {
  // passing the batch function to the dataloader constructor
  const loader = new DataLoader(async (keys) => {
    // fetching array of ids in a single query
    const data = await model.find({ _id: { $in: keys } });

    // using map to avoid errors,keys length has to match returned array length
    // so each key have to return an element of the array
    // and keeping the same order
    // eslint-disable-next-line eqeqeq
    return keys.map((key) => data.find((item) => item.id == key));
  });
  // returning the dataloader methods to be used in the resolvers
  return {
    load: async (id: unknown) => loader.load(id),
    loadMany: async (ids: ArrayLike<unknown>) => loader.loadMany(ids),
  };
};

export default {
  // each sub-resolver will have its own dataloader
  company: newLoader(companyModel),
  role: newLoader(roleModel),
};
