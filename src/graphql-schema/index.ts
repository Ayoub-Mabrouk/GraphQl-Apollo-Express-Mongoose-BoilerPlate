import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Load all resolvers
const resolversPath = join(__dirname, './**/resolver.*');
const resolversArray = loadFilesSync(resolversPath);
const resolvers = mergeResolvers(resolversArray);

// Load all typeDefs
const typeDefsPath = join(__dirname, './**/schema.*');
const typeDefsArray = loadFilesSync(typeDefsPath);
const typeDefs =  mergeTypeDefs(typeDefsArray);

// Create the schema to be used by Apollo Server
export const schema= makeExecutableSchema({ typeDefs, resolvers })
