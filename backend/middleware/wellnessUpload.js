import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage for different types of content
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'wellness-media/';
        
        // Determine subdirectory based on content type
        switch (req.body.contentType) {
            case 'sleep_story':
                uploadPath += 'sleep-stories/';
                break;
            case 'relaxing_sound':
                uploadPath += 'relaxing-sounds/';
                break;
            case 'yoga':
                uploadPath += 'yoga/';
                break;
            default:
                uploadPath += 'misc/';
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Create unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
    // Allow audio files
    if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
    }
    // Allow image files
    else if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    // Allow video files
    else if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Unsupported file type'), false);
    }
};

// Create multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB file size limit
    }
});

// Export different upload configurations for different content types
export const uploadWellnessContent = upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]); 