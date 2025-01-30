// routes/index.js
import express from 'express';
import { rootRouter, profileRouter, dashboardRouter } from './publicRoutes.js';
import { studentProfile, facultyProfile, adminProfile, updateProfile } from './profileRoutes.js';
import { studentDashboard } from './dashboardRoutes.js';
import { courseRouter } from './courseRoutes.js';

const router = express.Router();

// Serve root
router.use('/', rootRouter);

// Displays base profile page
router.use('/', profileRouter);

// Displays base dashboard page
router.use('/', dashboardRouter);

// Handles all the profile routes and display it based on the account using the base profile page
router.use('/', studentProfile, facultyProfile, adminProfile);

// Updating profile
router.post('/', updateProfile);

// Display all the dashboard
router.use('/', studentDashboard);

// Displays course page
router.use('/', courseRouter);

export default router;
