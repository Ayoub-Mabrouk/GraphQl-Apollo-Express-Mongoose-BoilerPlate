import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import {  mergeResolvers } from '@graphql-tools/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';

// Load all resolvers
const resolversPath = join(__dirname, './**/resolver.*');

const resolversArray = loadFilesSync(resolversPath);
export const resolvers = mergeResolvers(resolversArray);

//Load all typeDefs
const typeDefsPath = join(__dirname, './**/schema.*');
const typeDefsArray = loadFilesSync(typeDefsPath);
export const typeDefs =  mergeTypeDefs(typeDefsArray);