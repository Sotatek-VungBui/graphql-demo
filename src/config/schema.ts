import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from '@resolver/resolver';
import typeDefs from '@schema/schema';
import { applyMiddleware } from 'graphql-middleware';
import permissions from '@services/permissions';

const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs: typeDefs,
        resolvers: resolvers
    }),
    permissions
);

export default schema;
