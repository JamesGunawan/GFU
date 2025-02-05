import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/students.js';
import StudentCourse from '../models/student_courses.js';
import Course from '../models/courses.js';
import Payment from '../models/payments.js';

const studentPayments = express.Router();
const studentClasses = express.Router();


studentPayments.get('/dashboard/studentservices/payments', async (req, res) => {
res.render('studentservices', { service: 'payments'});
});

// Instead of showing the courses associated with the student, it's displaying all for now
studentClasses.get('/dashboard/studentservices/enrolledClasses', async (req, res) => {
  const courses = await Course.findAll();
  res.render('studentservices', { service : 'enrolledClasses', courses });
});


export { studentPayments, studentClasses }; 