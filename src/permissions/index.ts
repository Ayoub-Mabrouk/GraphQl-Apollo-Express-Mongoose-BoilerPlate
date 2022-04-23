import { shield, deny } from 'graphql-shield';
import { isAdmin } from './rules';
import ENV_VARS from '../env';

const permissions = shield(
  {
    Query: {
      // deny access to all queries that doent have a rule
      '*': deny,
      users: isAdmin,
    },
    Mutation: {},
  },
  {
    allowExternalErrors: ENV_VARS.isProduction,
  }
);
export default permissions;
