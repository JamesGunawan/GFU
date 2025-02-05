import express from 'express';
import Student from '../models/students.js';
import Course from '../models/courses.js';
import StudentCourse from '../models/student_courses.js';

const courseRouter = express.Router();

courseRouter.get('/dashboard/courses', async (req, res) => {
    const courses = await Course.findAll();
    res.render('courses', { courses });
});

// Function to register a student to a course
const registerCourse = async (req, res) => {
    const { studentId, courseId } = req.body;  // Destructuring request body for studentId and courseId
    const isRegistration = req.method === 'POST'; // Check if the request is for registration (POST) or unregistration (DELETE)
  
    try {
      if (isRegistration) {
        // Check if the student is already registered for the course
        const existingRegistration = await StudentCourse.findOne({
          where: {
            student_id: studentId,
            course_id: courseId,
          },
        });
  
        if (existingRegistration) {
          return res.status(400).json({ message: 'You are already registered for this course.' });
        }
  
        // Register the student for the course
        await StudentCourse.create({
          student_id: studentId,
          course_id: courseId,
          enrollment_date: new Date(),
          status: 'enrolled',
        });
  
        res.status(201).json({ message: 'Successfully registered for the course!' });
      } else {
        // Find and delete the registration entry
        const deletedRegistration = await StudentCourse.destroy({
          where: {
            student_id: studentId,
            course_id: courseId,
          },
        });
  
        if (deletedRegistration) {
          res.status(200).json({ message: 'Successfully unregistered from the course!' });
        } else {
          res.status(404).json({ message: 'Registration not found.' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };

  const unregisterCourse = async (req, res) => {
    const { studentId, courseId } = req.body;  // Destructuring request body for studentId and courseId
  
    try {
      // Find and delete the registration entry
      const deletedRegistration = await StudentCourse.destroy({
        where: {
          student_id: studentId,
          course_id: courseId,
        },
      });
  
      if (deletedRegistration) {
        res.status(200).json({ message: 'Successfully unregistered from the course!' });
      } else {
        res.status(404).json({ message: 'You are not registered for this course.' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };

export { courseRouter, registerCourse, unregisterCourse};