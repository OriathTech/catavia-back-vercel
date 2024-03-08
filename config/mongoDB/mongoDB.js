import mongoose from "mongoose";

const connectionMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Failed to connect to MongoDB:', error);
    }
};

export default connectionMongoose;