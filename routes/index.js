// index.js
import express from 'express';
import profileRouter from './public_routes.js'; // Adjusted path for clarity

const router = express.Router();

// Mount the profileRouter on the /profile path
router.use('/profile', profileRouter);

export default router;