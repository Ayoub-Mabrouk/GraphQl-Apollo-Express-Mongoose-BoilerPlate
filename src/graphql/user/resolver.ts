import { AuthPayload, SignUpInput, User } from "../../generatedTypes/graphql";
import { userModel } from "../../models";
export const resolvers = {
    Query: {
        users: async () =>await userModel.find().then(data=>data.map(user => {user.password=undefined;return user}))     
      },
    Mutation: {
        signUp: async (_: any,{input}:{input:SignUpInput})=> {
            const user= new userModel(input);
            return await user.save();
        }
    }
}
