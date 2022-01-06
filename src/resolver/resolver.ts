import isAuth from '@middleware/AuthMiddleware';

const resolvers = {
    // QUERY
    Query: {
        books: async (_: any, args: any, ctx: any) => await ctx.methods.getAllBooks({...args.params}),
        book: async (_: any, { id }: any, ctx: any) => await ctx.methods.getBookById(id),

        authors: async (_: any, __: any, ctx: any ) => await ctx.methods.getAllAuthors(),
        author: async (_: any, { id }: any, ctx: any) => await ctx.methods.getAuthorById(id),

        users: async (_: any, args: any, ctx: any) => await ctx.methods.getAllUsers({...args.params}),
        user: async (_: any, { id }: any, ctx: any) => await ctx.methods.getUserById(id),

        signIn: async (_: any, args: any, ctx: any) => await ctx.methods.signIn({...args.params})
    },
    Book: {
        author: async (parent: any, _: any, ctx: any) => await ctx.methods.getAuthorById(parent.authorId)
    },
    Author: {
        books: ({ id }: any, _: any, ctx: any) => {
            return isAuth(ctx.req, _, () => {
                return ctx.methods.getAllBooks({ authorId: id});
            });
        }
    },

    // MUTATION
    Mutation: {
        createAuthor: async (_: any, args: any, ctx: any ) => await ctx.methods.createAuthor({...args.authorInput}),
        createBook: async (_: any, args: any, ctx: any ) => await ctx.methods.createBook({...args.bookInput}),
        signUp: async (_: any, args: any, ctx: any) => await ctx.methods.signUp({...args.userInput})
    }
};

export default resolvers;
