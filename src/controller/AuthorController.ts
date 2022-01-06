import Author from '@models/Author';

const AuthorController = {
    getAllAuthors: async () => await Author.find(),
    getAuthorById: async (id: String) => await Author.findById(id),
    createAuthor: async (args: any) => {
        const newAuthor = new Author({...args});
        return await newAuthor.save();
    }
}

export default AuthorController