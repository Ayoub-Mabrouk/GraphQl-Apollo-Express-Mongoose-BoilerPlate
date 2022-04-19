import { companyModel } from '@models/Company';
import DataLoader from 'dataloader';
import { Model, Types } from 'mongoose';
const newLoader = (model: Model<any>) => {
    const loader = new DataLoader(async (keys) => {
        return await model.find({ _id: { $in: keys } }).then(data => data.map(item => { item.password = undefined; return item }))
    })
    return {
        load: async (id: Types.ObjectId) => loader.load(id),
        loadMany: async (ids: Types.ObjectId[]) => loader.loadMany(ids)
    };
}

export default   {
    company: newLoader(companyModel),
};