import express from 'express';

const displayStudentCourses = express.Router();

displayStudentCourses.get('/enrolledCourses', async (req, res) => {
    const token = req.query.token; // Get the token from the query parameters

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the JWT token
        const SECRET_KEY = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.userId;

        // Find the user by userId
        const user = await Student.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }

        // Get enrolled courses for the student
        const enrolledCourses = await user.getCourses();

        // Return the enrolled courses
        res.json(enrolledCourses);
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ message: 'Error fetching enrolled courses', error: error.message });
    }
});

export { displayStudentCourses };