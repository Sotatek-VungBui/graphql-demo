import express from 'express';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import db from '@services/db';
import formatError from '@config/formatError';
import { GraphQLContext } from '@type';
import 'dotenv/config';

// Load schema & resolvers
import typeDefs from '@schema/schema';
import resolvers from '@resolver/resolver';
import schema from '@config/schema';

// Load DB methods
import dataMethod from '@controller/index';

// Import middleware
// import isAuth from '@Middleware/AuthMiddleware';

// Connect DB
db.connectDB();

const server = new ApolloServer<ExpressContext>({
    // typeDefs,
    // resolvers,
    schema,
    context: (ctx) => ({
        methods: {...dataMethod},
        ...ctx
    }),
    formatError
});

const app = express();
// app.use(isAuth);
server.start().then(() => {
    server.applyMiddleware({ app });
});

app.listen({ port: process.env.PORT ||3005 }, () => {
    console.log(`Server listen at http://localhost:${process.env.PORT || 3005}${server.graphqlPath}`);
});
