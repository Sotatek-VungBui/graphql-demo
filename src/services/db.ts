import mongoose from 'mongoose';

async function connectDB() {
    try {
        await mongoose.connect(
            `${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
            {}
        );
        console.log('Connect DB successfully!');
    } catch (error) {
        console.log('Connect DB failure!', error);
    }
}

export default { connectDB };
