// Centralized API configuration utility
// This module provides a single source of truth for API URLs across the application

// Base API URL - reads from environment variable with fallback to localhost for development
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Constructs a full API URL by combining the base URL with the provided endpoint
 * @param {string} endpoint - The API endpoint path (should start with /)
 * @returns {string} The complete API URL
 * @example
 * getApiUrl('/login') // Returns 'http://localhost:5000/login' in development
 */
export const getApiUrl = (endpoint) => {
  // Ensure endpoint starts with / for consistency
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
};

/**
 * Constructs a full URL for uploaded images (profile pictures, journal covers, etc.)
 * Handles both relative paths and paths that already include the base URL
 * @param {string} path - The image path (e.g., 'uploads/image.jpg' or '/uploads/image.jpg')
 * @returns {string} The complete image URL
 * @example
 * getImageUrl('uploads/profile.jpg') // Returns 'http://localhost:5000/uploads/profile.jpg'
 * getImageUrl('/upload1/cover.jpg') // Returns 'http://localhost:5000/upload1/cover.jpg'
 */
export const getImageUrl = (path) => {
  if (!path) return '';
  
  // If path already includes http/https, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Ensure path starts with / for consistency
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};