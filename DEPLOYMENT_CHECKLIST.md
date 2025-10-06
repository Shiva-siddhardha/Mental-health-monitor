# Quick Deployment Checklist

## Pre-Deployment Verification

### ✅ Code Ready
- [ ] `server.js` has no duplicate code
- [ ] No hardcoded URLs (all use environment variables)
- [ ] All dependencies listed in package.json files
- [ ] `.env` files are in `.gitignore` (never commit secrets!)

### ✅ Environment Variables Prepared

**Backend (Render/Railway):**
- [ ] `PORT=5000`
- [ ] `MONGO_URI` (from MongoDB Atlas)
- [ ] `SESSION_SECRET` (generate: `openssl rand -base64 32`)
- [ ] `JWT_SECRET` (generate: `openssl rand -base64 32`)
- [ ] `FRONTEND_URL` (will update after Vercel deployment)
- [ ] `GEMINI_API_KEY` (from Google AI Studio)
- [ ] `ALLOWED_ORIGINS` (optional, comma-separated additional origins)

**Frontend (Vercel):**
- [ ] `REACT_APP_API_URL` (will update after backend deployment)
- [ ] `REACT_APP_GEMINI_API_KEY` (same as backend)

### ✅ External Services
- [ ] MongoDB Atlas cluster created and connection string ready
- [ ] Google Gemini API key obtained
- [ ] GitHub repository is up to date

## Deployment Steps

### 1. Deploy Backend First
1. [ ] Create new Web Service on Render/Railway
2. [ ] Connect GitHub repository
3. [ ] Set root directory to `backend`
4. [ ] Add all environment variables (use temporary FRONTEND_URL: http://localhost:3000)
5. [ ] Deploy and note the backend URL (e.g., https://your-app.onrender.com)

### 2. Deploy Frontend
1. [ ] Create new Project on Vercel
2. [ ] Connect GitHub repository
3. [ ] Set root directory to `frontend`
4. [ ] Add environment variables:
   - `REACT_APP_API_URL` = your backend URL from step 1
   - `REACT_APP_GEMINI_API_KEY` = your Gemini API key
5. [ ] Deploy and note the frontend URL (e.g., https://your-app.vercel.app)

### 3. Update Backend CORS
1. [ ] Go back to Render/Railway dashboard
2. [ ] Update `FRONTEND_URL` environment variable to your Vercel URL
3. [ ] Redeploy backend service

### 4. Test Everything
- [ ] User signup and login
- [ ] Profile picture upload
- [ ] Journal creation with cover image
- [ ] Mood tracking
- [ ] Anonymous posts
- [ ] AI Therapist chat
- [ ] Quiz functionality
- [ ] Wellness modules

## Important Notes

### 🎯 ML Service
The sentiment analysis automatically falls back to local processing. No external ML service needed!

### 📁 File Uploads
On Render free tier, uploaded files are ephemeral (deleted on restart). For production:
- Upgrade to Render paid plan with persistent disk, OR
- Migrate to cloud storage (AWS S3, Cloudinary)

### ⚡ Cold Starts
Render free tier spins down after 15 minutes of inactivity. First request may take 30-60 seconds.

### 🔒 Security
- Never commit `.env` files
- Use strong random secrets (32+ characters)
- Keep dependencies updated
- Monitor logs for suspicious activity

## Troubleshooting

**CORS Errors?**
- Verify `FRONTEND_URL` matches your exact Vercel URL (no trailing slash)
- Redeploy backend after changing environment variables

**API Connection Errors?**
- Check `REACT_APP_API_URL` on Vercel
- Verify backend is running (check Render dashboard)
- Wait 30-60 seconds for cold start on free tier

**Images Not Loading?**
- Remember: Render free tier has ephemeral storage
- Check browser console for 404 errors
- Verify upload routes are accessible

## Resources

See `DEPLOYMENT.md` for detailed step-by-step instructions.

---

**Ready to deploy!** 🚀