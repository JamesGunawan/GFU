import express from 'express';

const rootRouter = express.Router();
const profileRouter = express.Router();
const dashboardRouter = express.Router();
const coursesRouter =  express.Router();

// Renders root
rootRouter.get('/', (req, res) => {
    res.render('auth');
});

// Renders profile.ejs as /profile page
profileRouter.get('/profile', (req, res) => {
    res.render('profile', {profile:{}});
});

dashboardRouter.get('/dashboard', (req, res) => {
    res.render('dashboard', {profile:{}});
});

coursesRouter.get('/courses', (req, res) => {
    res.render('courses', {profile:{}});
});



export { rootRouter, profileRouter, dashboardRouter, coursesRouter };
