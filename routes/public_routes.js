import express from 'express';

// Renders profile.ejs as /profile page
app.get('/profile', (req, res) => {
    res.render('profile');
});

export default router;

//this doesn't render anything loll, still confused on how to route everything in a organized way