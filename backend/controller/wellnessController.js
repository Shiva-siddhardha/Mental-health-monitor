import SleepStory from '../models/SleepStory.js';
import RelaxingSound from '../models/RelaxingSound.js';
import BreathingExercise from '../models/BreathingExercise.js';
import YogaPose from '../models/YogaPose.js';

// Sleep Stories Controllers
export const getAllSleepStories = async (req, res) => {
    try {
        const stories = await SleepStory.find({ type: 'sleep_story' });
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSleepSounds = async (req, res) => {
    try {
        const sounds = await SleepStory.find({ type: 'ambient_sound' });
        res.status(200).json(sounds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Relaxing Sounds Controllers
export const getAllRelaxingSounds = async (req, res) => {
    try {
        const sounds = await RelaxingSound.find();
        res.status(200).json(sounds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRelaxingSoundById = async (req, res) => {
    try {
        const sound = await RelaxingSound.findById(req.params.id);
        if (!sound) {
            return res.status(404).json({ message: 'Sound not found' });
        }
        res.status(200).json(sound);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Breathing Exercises Controllers
export const getAllBreathingExercises = async (req, res) => {
    try {
        const exercises = await BreathingExercise.find();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBreathingExerciseByEmotion = async (req, res) => {
    try {
        const exercise = await BreathingExercise.findOne({ emotion: req.params.emotion });
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json(exercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Yoga Poses Controllers
export const getAllYogaPoses = async (req, res) => {
    try {
        const { level, category } = req.query;
        const query = {};
        
        if (level) query.level = level;
        if (category) query.category = category;
        
        const poses = await YogaPose.find(query);
        res.status(200).json(poses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getYogaPoseById = async (req, res) => {
    try {
        const pose = await YogaPose.findById(req.params.id);
        if (!pose) {
            return res.status(404).json({ message: 'Yoga pose not found' });
        }
        res.status(200).json(pose);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin Controllers for Creating Content
export const createSleepStory = async (req, res) => {
    try {
        const story = new SleepStory(req.body);
        const savedStory = await story.save();
        res.status(201).json(savedStory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createRelaxingSound = async (req, res) => {
    try {
        const sound = new RelaxingSound(req.body);
        const savedSound = await sound.save();
        res.status(201).json(savedSound);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createBreathingExercise = async (req, res) => {
    try {
        const exercise = new BreathingExercise(req.body);
        const savedExercise = await exercise.save();
        res.status(201).json(savedExercise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createYogaPose = async (req, res) => {
    try {
        const pose = new YogaPose(req.body);
        const savedPose = await pose.save();
        res.status(201).json(savedPose);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 