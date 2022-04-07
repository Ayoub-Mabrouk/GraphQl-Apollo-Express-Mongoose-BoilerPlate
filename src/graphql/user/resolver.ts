import { userModel } from "../../models";
export const resolvers = {
    Query: {
        users: async () =>await userModel.find().then(data=>data.map(user => {user.password=undefined;return user}))     
      },
}
