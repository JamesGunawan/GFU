import express from 'express';
import Course from '../models/courses.js';

const courseRouter = express.Router();

courseRouter.get('/courses', async (req, res) => {
    const courses = await Course.findAll();
    res.render('courses', { courses });
});

export { courseRouter };