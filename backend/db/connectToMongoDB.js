import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        const mongoURI = process.env.MONGO_DB_URI;
        if (!mongoURI) {
            throw new Error('MongoDB URI is not defined in the environment variables');
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectToMongoDB;
