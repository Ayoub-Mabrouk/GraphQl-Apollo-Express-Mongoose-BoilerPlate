import { rule } from 'graphql-shield';

export const isUser = rule()(async (parent, args, { user }, info) => {
    try {

        if (user && user.roles.includes("user")) {
            return true;
        }
        return false;
    } catch (err) {
        throw err;
    }
});
export const isAdmin = rule()(async (parent, args, { user }, info) => {
    try {        
        if (user && user.roles.includes("admin")) {
            return true;
        }
        return false;
    } catch (err) {
        throw err;
    }
});
