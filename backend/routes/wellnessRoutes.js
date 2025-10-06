import express from 'express';
import * as wellnessController from '../controller/wellnessController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { uploadWellnessContent } from '../middleware/wellnessUpload.js';

const router = express.Router();

// Sleep Stories Routes
router.get('/sleep-stories', authenticateToken, wellnessController.getAllSleepStories);
router.get('/sleep-sounds', authenticateToken, wellnessController.getSleepSounds);

// Relaxing Sounds Routes
router.get('/relaxing-sounds', authenticateToken, wellnessController.getAllRelaxingSounds);
router.get('/relaxing-sounds/:id', authenticateToken, wellnessController.getRelaxingSoundById);

// Breathing Exercises Routes
router.get('/breathing-exercises', authenticateToken, wellnessController.getAllBreathingExercises);
router.get('/breathing-exercises/:emotion', authenticateToken, wellnessController.getBreathingExerciseByEmotion);

// Yoga Poses Routes
router.get('/yoga-poses', authenticateToken, wellnessController.getAllYogaPoses);
router.get('/yoga-poses/:id', authenticateToken, wellnessController.getYogaPoseById);

// Admin Routes for Creating Content
router.post('/admin/sleep-stories', authenticateToken, uploadWellnessContent, wellnessController.createSleepStory);
router.post('/admin/relaxing-sounds', authenticateToken, uploadWellnessContent, wellnessController.createRelaxingSound);
router.post('/admin/breathing-exercises', authenticateToken, uploadWellnessContent, wellnessController.createBreathingExercise);
router.post('/admin/yoga-poses', authenticateToken, uploadWellnessContent, wellnessController.createYogaPose);

export default router; 