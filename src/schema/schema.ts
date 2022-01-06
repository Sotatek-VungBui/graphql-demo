import { gql } from 'apollo-server-express';

const typeDefs = gql`
    # DEFINE PARAM
    input Params {
        authorId: String
    },

    input UserParams {
        email: String
    }

    # TYPE INPUT
    input UserInput {
        email: String!
        password: String!
    }

    input BookInput {
        name: String!
        genre: String!
        authorId: ID!
    }

    input AuthorInput {
        name: String!
        age: Int
    }

    input LoginInput {
        email: String!
        password: String!
    }

    # TYPE DATA BASE
    type Book {
        id: ID
        name: String
        genre: String
        author: Author
    }

    type Author {
        id: ID!
        name: String
        age: Int
        books: [Book]
    }

    type User {
        id: ID!
        email: String!
        password: String!
    }

    type AuthData {
        userId: String!
        token: String!
        tokenExpiration: Int!
    }

    # ROOT TYPE
    type Query {
        books(params: Params): [Book]
        book(id: ID!): Book
        authors: [Author]
        author(id: ID!): Author
        users(params: UserParams): [User]
        user(id: ID!): User
        signIn(params: LoginInput): AuthData!
    }

    type Mutation {
        createAuthor(authorInput: AuthorInput): Author
        createBook(bookInput: BookInput): Book
        signUp(userInput: UserInput): User
    }
`;
export default typeDefs;
