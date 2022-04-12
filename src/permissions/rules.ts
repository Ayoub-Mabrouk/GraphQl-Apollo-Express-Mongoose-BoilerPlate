import { rule } from 'graphql-shield';

export const isUser = rule()(async (_parent, _args, {req }, _info) => {
    try {
        return true;
    } catch (err) {
        throw err;
    }
});
export const isAdmin = rule()(async (_parent, _args, { req }, _info) => {
    try {
        return false;
    } catch (err) {
        throw err;
    }
});
