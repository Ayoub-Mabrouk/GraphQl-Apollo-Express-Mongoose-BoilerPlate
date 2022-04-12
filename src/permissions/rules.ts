import { rule } from 'graphql-shield';

// cache:contextual - use when rule only relies on context parameter (useful for authentication).
export const isUser = rule({ cache: 'contextual' })(async (parent, args, { user }, info) => {
    try {

        if (user && user.roles.includes("user")) {
            return true;
        }
        // Shield, by default, catches all errors thrown during resolver execution
        // To return custom error messages to your client, you can return error instead of throwing it
        return  new Error("Nice try,You can't do that 😕");
    } catch (err) {
        throw err;
    }
});
export const isAdmin = rule({ cache: 'contextual' })(async (parent, args, { user }, info) => {
    try {        
        if (user && user.roles.includes("admin")) {
            return true;
        }
        return  new Error("Nice try,You can't do that 😕");
    } catch (err) {
        throw err;
    }
});
