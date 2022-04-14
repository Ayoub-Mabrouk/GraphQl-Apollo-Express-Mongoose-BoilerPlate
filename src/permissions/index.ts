import { shield, or, deny } from 'graphql-shield';
import {isAdmin, isUser} from './rules';
export const permissions = shield({
    Query: {
        // deny access to all queries that doent have a rule
      "*":deny,
      users: isAdmin,
      companies: or(isAdmin, isUser),
    },
    Mutation:{

    }
  });