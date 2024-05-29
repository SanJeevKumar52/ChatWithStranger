import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'], // Assuming only these values are allowed
    },
    profilePic: {
        type: String,
        default: ""
    },
}, {
    timestamps: true, // Automatically create `createdAt` and `updatedAt` fields
});

// Create the user model
const User = mongoose.model('User', userSchema);

export default User;
