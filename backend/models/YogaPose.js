import mongoose from 'mongoose';

const yogaPoseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    category: {
        type: String,
        enum: ['Stress Relief', 'Anxiety', 'Depression', 'Sleep', 'Focus'],
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    benefits: {
        type: String
    },
    instructions: [{
        type: String
    }],
    imageUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('YogaPose', yogaPoseSchema); 