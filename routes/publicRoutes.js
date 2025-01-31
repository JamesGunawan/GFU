import express from 'express';

const rootRouter = express.Router();
const profileRouter = express.Router();
const dashboardRouter = express.Router();
const studentServicesRouter = express.Router();

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

studentServicesRouter.get('/dashboard/studentservices', (req, res) =>{
    res.render('studentservices', {profile:{}});
})


export { rootRouter, profileRouter, dashboardRouter, studentServicesRouter };
