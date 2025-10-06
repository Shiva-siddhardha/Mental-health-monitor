# Deployment Guide

This guide provides step-by-step instructions for deploying the Mental Health Monitoring Web Application to production using Vercel (frontend) and Render (backend).

## Prerequisites

Before you begin, ensure you have:

- **GitHub Account**: Your code should be pushed to a GitHub repository
- **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier available)
- **Render Account**: Sign up at [render.com](https://render.com) (free tier available)
- **MongoDB Atlas Account**: Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **Google Gemini API Key**: Obtain from [Google AI Studio](https://makersuite.google.com/app/apikey)

**⚠️ IMPORTANT SECURITY NOTE:**
- **NEVER** commit `.env` files to version control
- The `.gitignore` file is already configured to exclude `.env` files
- Always use environment variables for sensitive data (API keys, secrets, database credentials)

---

## Backend Deployment (Render)

### Step 1: Prepare Your Backend

Ensure your backend code is pushed to GitHub with the following structure:
```
backend/
├── server.js
├── package.json
├── .env.example (committed)
└── .env (NOT committed)
```

### Step 2: Create a New Web Service on Render

1. Log in to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** button and select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository from the list

### Step 3: Configure the Web Service

Fill in the following settings:

- **Name**: Choose a name for your service (e.g., `mental-health-backend`)
- **Region**: Select the region closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free` (or choose a paid plan for better performance)

### Step 4: Add Environment Variables

In the "Environment Variables" section, add all variables from `backend/.env.example`:

| Key | Value | Notes |
|-----|-------|-------|
| `PORT` | `5000` | Render will override this with its own port |
| `MONGO_URI` | `your_mongodb_connection_string` | Get from MongoDB Atlas |
| `SESSION_SECRET` | `your_session_secret_here` | Generate with `openssl rand -base64 32` |
| `JWT_SECRET` | `your_jwt_secret_here` | Generate with `openssl rand -base64 32` |
| `FRONTEND_URL` | `http://localhost:3000` | Update after frontend deployment |
| `GEMINI_API_KEY` | `your_gemini_api_key_here` | Get from Google AI Studio |

**How to get MongoDB URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a cluster (free tier available)
3. Click "Connect" → "Connect your application"
4. Copy the connection string and replace `<password>` with your database user password

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait for the deployment to complete (usually 2-5 minutes)
3. Once deployed, note your backend URL: `https://your-app-name.onrender.com`

### Step 6: Important Notes

⚠️ **Render Free Tier Limitations:**
- Services spin down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds (cold start)
- Ephemeral storage: uploaded files are deleted when the service restarts
- For production use, consider upgrading to a paid plan

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Your Frontend

Ensure your frontend code is in the `frontend/` directory with:
```
frontend/
├── src/
├── public/
├── package.json
├── .env.example (committed)
└── .env (NOT committed)
```

### Step 2: Import Project to Vercel

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will detect it as a monorepo

### Step 3: Configure the Project

- **Framework Preset**: `Create React App`
- **Root Directory**: Click **"Edit"** and select `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `build` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 4: Add Environment Variables

In the "Environment Variables" section, add:

| Key | Value | Notes |
|-----|-------|-------|
| `REACT_APP_API_URL` | `https://your-app-name.onrender.com` | Your Render backend URL (from Step 5 above) |
| `REACT_APP_GEMINI_API_KEY` | `your_gemini_api_key_here` | Same key used in backend |

**Important:** All React environment variables must be prefixed with `REACT_APP_` to be accessible in the application.

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build and deployment to complete (usually 1-3 minutes)
3. Once deployed, note your frontend URL: `https://your-app.vercel.app`

---

## Post-Deployment Configuration

### Step 1: Update Backend CORS Configuration

Now that you have your Vercel frontend URL, you need to update the backend to allow requests from it:

1. Go back to your [Render Dashboard](https://dashboard.render.com/)
2. Select your backend web service
3. Go to **"Environment"** tab
4. Update the `FRONTEND_URL` variable:
   - **Old value**: `http://localhost:3000`
   - **New value**: `https://your-app.vercel.app` (your actual Vercel URL)
5. Click **"Save Changes"**

### Step 2: Redeploy Backend

1. Go to the **"Manual Deploy"** section
2. Click **"Deploy latest commit"** or trigger a redeploy
3. Wait for the deployment to complete

This step is crucial for CORS to work correctly and allow your frontend to communicate with the backend.

### Step 3: Test Your Application

Visit your Vercel URL and test all features:

- ✅ **User Authentication**: Sign up, log in, log out
- ✅ **Profile Management**: View and update user profile
- ✅ **Journal Features**: Create, read, update, delete journals
- ✅ **Mood Tracking**: Log moods and view mood history
- ✅ **Anonymous Posts**: Create and view anonymous posts
- ✅ **AI Therapist**: Test the AI chat functionality
- ✅ **Quiz**: Test the mental health quiz

---

## File Uploads Consideration

### Current Implementation

The application currently stores uploaded files (profile pictures, journal covers) in local directories:
- `backend/uploads/` - Profile pictures
- `backend/upload1/` - Journal cover images

### ⚠️ Render Free Tier Limitation

**Ephemeral Storage**: Render's free tier uses ephemeral storage, meaning:
- Uploaded files are stored temporarily
- Files are **deleted** when the service restarts or redeploys
- This happens automatically after periods of inactivity

### Solutions for Production

**Option 1: Upgrade to Render Paid Plan**
- Paid plans include persistent disks
- Files are retained across restarts
- Cost: Starting at $7/month

**Option 2: Use Cloud Storage (Recommended for Scale)**

Integrate a cloud storage service:

1. **AWS S3**
   - Most popular option
   - Pay-as-you-go pricing
   - Requires AWS account and S3 bucket setup

2. **Cloudinary**
   - Specialized for images
   - Free tier: 25GB storage, 25GB bandwidth/month
   - Easy integration with Node.js

3. **Google Cloud Storage**
   - Similar to S3
   - Good integration with Google services

**Implementation Note**: Switching to cloud storage requires code changes in the backend upload routes and frontend image display logic.

---

## Troubleshooting

### CORS Errors

**Symptom**: Browser console shows errors like:
```
Access to XMLHttpRequest at 'https://your-app.onrender.com/...' from origin 'https://your-app.vercel.app' has been blocked by CORS policy
```

**Solution**:
1. Verify `FRONTEND_URL` environment variable on Render is set to your exact Vercel URL
2. Ensure there are no trailing slashes in the URL
3. Redeploy the backend after changing environment variables
4. Clear browser cache and try again

### API Connection Errors

**Symptom**: Frontend shows "Network Error" or "Failed to fetch"

**Solution**:
1. Check that `REACT_APP_API_URL` on Vercel is set correctly
2. Verify the backend is running on Render (check the Render dashboard)
3. Test the backend directly by visiting `https://your-app.onrender.com` in a browser
4. If using free tier, wait 30-60 seconds for cold start
5. Check browser console for specific error messages

### Authentication Issues

**Symptom**: Login works but user is immediately logged out, or sessions don't persist

**Solution**:
1. Verify `JWT_SECRET` is set on Render
2. Verify `SESSION_SECRET` is set on Render
3. Check that both secrets are strong random strings (32+ characters)
4. Ensure cookies are enabled in the browser
5. Check that `credentials: true` is set in CORS configuration (already configured in `server.js`)

### Image Loading Issues

**Symptom**: Profile pictures or journal covers don't display

**Solution**:
1. Check that backend routes `/uploads` and `/upload1` are accessible
2. Verify images were uploaded successfully (check backend logs)
3. Remember: On Render free tier, images are deleted on restart
4. Check browser console for 404 errors on image URLs
5. Consider implementing cloud storage for persistent image hosting

### Cold Start Delays

**Symptom**: First request takes 30-60 seconds, then works fine

**Solution**:
- This is expected behavior on Render's free tier
- Services spin down after 15 minutes of inactivity
- Options:
  1. Accept the delay (suitable for development/testing)
  2. Upgrade to a paid Render plan (no spin-down)
  3. Implement a "keep-alive" ping service (not recommended, may violate ToS)

### Build Failures

**Backend Build Fails**:
1. Check that `package.json` is in the `backend/` directory
2. Verify all dependencies are listed in `package.json`
3. Check Render build logs for specific error messages
4. Ensure Node.js version compatibility

**Frontend Build Fails**:
1. Check that `package.json` is in the `frontend/` directory
2. Verify the root directory is set to `frontend` in Vercel settings
3. Check Vercel build logs for specific error messages
4. Ensure all environment variables are set correctly

---

## Environment Variables Checklist

Use this checklist to ensure all required environment variables are configured correctly.

### Backend Environment Variables (Render)

Reference: `backend/.env.example`

- [ ] `PORT` - Set to `5000` (Render will override with its own port)
- [ ] `MONGO_URI` - MongoDB Atlas connection string
- [ ] `SESSION_SECRET` - Random string (32+ characters)
- [ ] `JWT_SECRET` - Random string (32+ characters, different from SESSION_SECRET)
- [ ] `FRONTEND_URL` - Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
- [ ] `GEMINI_API_KEY` - Google Gemini API key

**How to generate secure secrets:**
```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Frontend Environment Variables (Vercel)

Reference: `frontend/.env.example`

- [ ] `REACT_APP_API_URL` - Your Render backend URL (e.g., `https://your-app.onrender.com`)
- [ ] `REACT_APP_GEMINI_API_KEY` - Google Gemini API key (same as backend)

**Important Reminders:**
- All React environment variables **must** be prefixed with `REACT_APP_`
- After changing environment variables on Vercel, you must redeploy
- After changing environment variables on Render, you must redeploy

---

## Monitoring and Maintenance

### Render Dashboard

Monitor your backend service:
- **Logs**: View real-time application logs
- **Metrics**: CPU, memory usage (paid plans)
- **Events**: Deployment history and status

### Vercel Dashboard

Monitor your frontend deployment:
- **Deployments**: View all deployment history
- **Analytics**: Page views, performance (paid plans)
- **Logs**: Function logs and errors

### MongoDB Atlas

Monitor your database:
- **Metrics**: Database operations, connections
- **Alerts**: Set up alerts for high usage
- **Backup**: Configure automated backups (paid plans)

---

## Next Steps

After successful deployment:

1. **Set up a custom domain** (optional)
   - Vercel: Add custom domain in project settings
   - Render: Add custom domain in service settings
   - Update environment variables accordingly

2. **Enable HTTPS** (automatic)
   - Both Vercel and Render provide free SSL certificates
   - HTTPS is enabled by default

3. **Set up monitoring** (optional)
   - Consider services like Sentry for error tracking
   - Set up uptime monitoring (e.g., UptimeRobot)

4. **Implement cloud storage** (recommended)
   - Migrate file uploads to AWS S3 or Cloudinary
   - Update backend upload routes and frontend image URLs

5. **Optimize performance**
   - Enable caching where appropriate
   - Optimize images and assets
   - Consider upgrading to paid plans for better performance

---

## Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **MongoDB Atlas Documentation**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com/)
- **React Documentation**: [react.dev](https://react.dev/)
- **Express Documentation**: [expressjs.com](https://expressjs.com/)

---

## Security Best Practices

- ✅ Never commit `.env` files to version control
- ✅ Use strong, randomly generated secrets for JWT and sessions
- ✅ Keep dependencies updated (`npm audit` and `npm update`)
- ✅ Use HTTPS for all production traffic (automatic with Vercel/Render)
- ✅ Regularly rotate API keys and secrets
- ✅ Monitor application logs for suspicious activity
- ✅ Implement rate limiting for API endpoints (consider adding this)
- ✅ Validate and sanitize all user inputs (already implemented)

---

**Congratulations!** 🎉 Your Mental Health Monitoring Web Application is now deployed and ready for use!