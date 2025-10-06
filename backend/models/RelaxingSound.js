import mongoose from 'mongoose';

const relaxingSoundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    tags: [{
        type: String
    }],
    thumbnail: {
        type: String
    },
    audioUrl: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    soundTypes: [{
        name: {
            type: String,
            required: true
        },
        audioUrl: {
            type: String,
            required: true
        },
        volume: {
            type: Number,
            default: 50,
            min: 0,
            max: 100
        }
    }],
    category: {
        type: String,
        enum: ['Nature', 'Ambient', 'Meditation', 'White Noise'],
        default: 'Nature'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('RelaxingSound', relaxingSoundSchema); 