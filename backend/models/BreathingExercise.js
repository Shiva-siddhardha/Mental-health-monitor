import mongoose from 'mongoose';

const breathingExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#6B48FF'
    },
    icon: {
        type: String
    },
    emotion: {
        type: String,
        enum: ['Stress', 'Anger', 'Irritation', 'Sadness', 'Fear', 'Worry', 'Envy'],
        required: true
    },
    instructions: {
        breatheIn: {
            type: Number,
            default: 4
        },
        holdIn: {
            type: Number,
            default: 4
        },
        breatheOut: {
            type: Number,
            default: 4
        },
        holdOut: {
            type: Number,
            default: 4
        }
    },
    description: {
        type: String
    },
    benefits: {
        type: String
    },
    animation: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('BreathingExercise', breathingExerciseSchema); 