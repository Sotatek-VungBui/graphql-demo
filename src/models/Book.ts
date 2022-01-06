import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: { type: String },
    genre: { type: String },
    authorId: { type: String },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

export default mongoose.model('books', BookSchema);