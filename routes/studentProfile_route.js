// Student profile route
app.get('/profile/studentProfile', (req, res) => {
    res.render('profile', { profile: studentProfile });
});