import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/students.js';
import StudentCourse from '../models/student_courses.js';
import Course from '../models/courses.js';

const displayStudentCourses = express.Router();

displayStudentCourses.get('/dashboard/studentservices/enrolledCourses', async (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the JWT token
    const SECRET_KEY = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    // Find the enrolled courses for the user
    const enrolledCourses = await Course.findAll({
      include: [
        {
          model: StudentCourse,
          where: { student_id: userId },
          include: [
            {
              model: Student,
              attributes: ['student_id', 'first_name', 'last_name'],
            },
          ],
        },
      ],
    });

    // Render the enrolled courses using an EJS template
    res.render('studentservices', { enrolledCourses });
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: 'Error fetching enrolled courses' });
  }
});

export { displayStudentCourses };