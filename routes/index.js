// routes/index.js
import express from 'express';
import { rootRouter, profileRouter } from './publicRoutes.js';
import { studentProfile, facultyProfile, adminProfile } from './profileRoutes.js';

const router = express.Router();

// Define the profile route
router.use('/', rootRouter);
router.use('/', profileRouter);
router.use('/', studentProfile, facultyProfile, adminProfile);

// Export them as named exports


export default router;
