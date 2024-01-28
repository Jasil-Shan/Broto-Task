import mongoose from "mongoose";

export async function dbConnect() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_CONFIG);
        console.log('Database connected');
    } catch (err) {
        console.log(`Database error:\n${err}`);
    }
};



