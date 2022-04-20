import { companyModel } from '@models/Company';
import { roleModel } from '@models/Role';
import DataLoader from 'dataloader';
import { Model, Types } from 'mongoose';

const newLoader = (model: Model<any>) => {
    // passing the batch function to the dataloader constructor
    const loader = new DataLoader(async (keys) => {
        //fetching array of ids in a single query

        let data = await model.find({ _id: { $in: keys } })

        // using map to avoid errors,keys length has to match returned array length
        // so each key have to return an element of the array
        // and keeping the same order
        let result = keys.map((key) => data.find(item => item.id == key))
        return result
    })
    // returning the dataloader methods to be used in the resolvers
    return {
        load: async (id: Types.ObjectId) => loader.load(id),
        loadMany: async (ids: Types.ObjectId[]) => loader.loadMany(ids)
    };
}

export default {
    //each sub-resolver will have its own dataloader
    company: newLoader(companyModel),
    role: newLoader(roleModel)
};