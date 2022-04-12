import { shield, or } from 'graphql-shield';
import {isAdmin, isUser} from './rules';
export const permissions = shield({
    Query: {
      users: isAdmin,
      companies: or(isAdmin, isUser),
    },
    Mutation:{

    }
  });