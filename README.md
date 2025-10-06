# MentalHealthApp  

MentalHealthApp is a comprehensive mental health application built using the MERN stack. It offers several features to help users manage their mental well-being, including cookie session login, a mood tracker, an AI therapist, a mood quiz, and anonymous sharing.

## Features

### Cookie Session Login
- Secure user authentication using cookie sessions to maintain user login states across different sessions. So also with an unauthorised acces you can't access certain pages of the application.  

### Mood Tracker
- Tracks your daily mood and logs it in the database, allowing users to monitor their mental health over time.

### AI Therapist
- Chat with an AI therapist to discuss your feelings and get instant responses. This feature uses the Google Gemini API (via environment-provided API key) for natural language processing to provide helpful advice and support.
- Graceful degradation: If the Gemini API key is not configured or the service is unavailable, the UI provides clear messaging and the app continues to function for other features.

### Mood Quiz
- Take a quiz to understand your current mood better. The responses are analyzed (optionally using the Gemini API for richer feedback), and a personalized feedback report is generated based on your answers.
- The app stores quiz results locally (and optionally in the backend) so the AI Therapist can provide tailored responses when available.

### Sentiment Analysis (Local & Resilient)
- Sentiment analysis for journal entries is performed locally with a lexicon-based algorithm included in the frontend. The app attempts to call a backend ML endpoint if available, but will automatically fall back to the local analyzer when the endpoint is unreachable.
- This design ensures the app continues to provide sentiment scoring even when external ML services are not configured.

### Anonymous Sharing
- Share your thoughts and feelings anonymously with the community. This feature ensures that users can express themselves freely without revealing their identity.

### CRUD Functionality
- Full CRUD (Create, Read, Update, Delete) operations for user management and article management, allowing users to manage their profiles and content seamlessly.

## Technologies Used

- **MongoDB:** Database to store user data, mood logs, and shared posts.
- **Express.js:** Backend framework to handle API requests and server-side logic.
- **React:** Frontend library to build a responsive and interactive user interface.
- **Node.js:** Runtime environment to execute JavaScript on the server.
- **HTML, CSS, JavaScript:** Core web technologies for building the frontend.
- **RapidAPI / Gemini API:** Gemini (Google) powers the AI therapist and optional enhanced quiz feedback when API key is configured.
- **UI Libraries:** Tailwind CSS, Chakra UI, Material-UI are used across the frontend for styling and components.

## Quick Start

1. Clone the repository:
   - git clone <your-repo-url>

2. Copy environment files:
   - In both `frontend/` and `backend/` copy `.env.example` to `.env` and update values.

3. Required environment variables (high level):
   - Backend:
     - PORT (default: 5000)
     - MONGO_URI (MongoDB Atlas connection string)
     - SESSION_SECRET (32+ chars)
     - JWT_SECRET (32+ chars — used for signing tokens stored in localStorage)
     - FRONTEND_URL (e.g., http://localhost:3000 for development)
     - GEMINI_API_KEY (optional for AI Therapist; app still works without it)
     - ALLOWED_ORIGINS (optional, comma-separated)
   - Frontend:
     - REACT_APP_API_URL (backend URL, e.g., http://localhost:5000)
     - REACT_APP_GEMINI_API_KEY (optional — same as backend GEMINI_API_KEY if you want client-side direct usage)

4. Install dependencies and run locally:
   - Backend:
     - cd backend
     - npm install
     - npm start
   - Frontend:
     - cd frontend
     - npm install
     - npm start

5. No ML service setup required:
   - Sentiment analysis will automatically fall back to local processing. You do not need to configure an external ML service for sentiment features to work.

## Deployment

- See `DEPLOYMENT.md` for detailed deployment instructions (Vercel for frontend, Render for backend).
- See `DEPLOYMENT_CHECKLIST.md` for a quick pre-deployment checklist to verify environment variables and settings.
- Recommended platforms:
  - Frontend: Vercel
  - Backend: Render or Railway

## Architecture Note

- Frontend: React with Tailwind CSS, Chakra UI, Material-UI
- Backend: Node.js / Express
- Database: MongoDB (Atlas)
- Authentication: JWT-based (tokens stored in localStorage). Historically, some code references cookie session middleware; for deployments we recommend JWT tokens and stateless auth.
- AI: Google Gemini API for therapist chat and optional enhanced responses (requires API key).
- Sentiment Analysis: Local lexicon-based algorithm in the frontend with optional backend ML endpoint. The app is resilient and falls back to local analysis if the backend ML endpoint or external services are unavailable.

## Important Notes

- NEVER commit your `.env` files. Use `.env.example` as reference and add `.env` to `.gitignore`.
- File uploads are stored in local directories by default. On some hosting platforms (Render free tier) storage is ephemeral — consider using S3/Cloudinary or a persistent disk for production.
- Ensure proper environment variables are configured in your hosting platform and update CORS (FRONTEND_URL / ALLOWED_ORIGINS) accordingly.

## Resources

- For deployment: See `DEPLOYMENT.md` and `DEPLOYMENT_CHECKLIST.md`.
- For sentiment analyzer: `frontend/src/utils/sentimentAnalyzer.js` contains the local lexicon-based implementation and fallback logic.
- For AI Therapist: `frontend/src/compnents/AITherapist/Therapist.jsx` uses the Gemini API when configured.

---
Thank you for using MentalHealthApp — built to be resilient, privacy-conscious, and easy to deploy. 🚀
