import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import userRoutes from './routes/route.js';
import Connection from './database/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

mongoose.set('strictQuery', true);

const app = express();
const server = http.createServer(app);

// Parse allowed origins from env (comma-separated) and include FRONTEND_URL and localhost for dev
const extraOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const allowedOrigins = [...new Set([process.env.FRONTEND_URL, 'http://localhost:3000', ...extraOrigins].filter(Boolean))];

function isVercelPreview(origin) {
  try {
    const u = new URL(origin);
    return u.hostname.endsWith('.vercel.app');
  } catch (e) {
    return false;
  }
}

app.use(cors({
  origin: (origin, cb) => {
    // allow non-browser or same-origin requests (no origin)
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin) || isVercelPreview(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: false, // JWT stored in localStorage; no cookies needed
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Keep passport initialized (strategies may be used for JWT verification), but do not use session middleware
app.use(passport.initialize());

// Serve uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload1', express.static(path.join(__dirname, 'upload1')));

// Initialize DB connection and mount routes
Connection();
app.use('/', userRoutes);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log('Server is running on port', port);
});