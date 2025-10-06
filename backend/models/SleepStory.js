import mongoose from 'mongoose';

const sleepStorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: ['Story', 'Sound', 'Meditation'],
        default: 'Story'
    },
    type: {
        type: String,
        enum: ['sleep_story', 'ambient_sound', 'meditation'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('SleepStory', sleepStorySchema); 