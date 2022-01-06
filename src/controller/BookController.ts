import Book from '@models/Book';

const BookController = {
    getAllBooks: async (query?: any) => await Book.find(query),
    getBookById: async (id: String) => await Book.findById(id),
    createBook: async (args: any) => {
        const newBook =  new Book({...args});
        return await newBook.save();
    }
}

export default BookController