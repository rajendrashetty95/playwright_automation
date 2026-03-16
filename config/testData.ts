import { config } from 'dotenv';

// Load environment variables from .env file
config();

export const testData = {
  login: {
    email: process.env.TEST_EMAIL || 'test@example.com',
    password: process.env.TEST_PASSWORD || 'test123',
  },
  signup: {
    name: process.env.TEST_NAME || 'Test User',
    email: process.env.TEST_SIGNUP_EMAIL || `signup${Date.now()}@example.com`,
  },
};