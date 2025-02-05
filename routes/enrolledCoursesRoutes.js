import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/students.js';
import StudentCourse from '../models/student_courses.js';
import Course from '../models/courses.js';
import Payment from '../models/payments.js';

const studentPayments = express.Router();
const studentClasses = express.Router();


studentPayments.get('/dashboard/studentservices/payments', async (req, res) => {
  const token = req.query.token; // Get the token from the query parameters
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    // Verify the JWT token
    const SECRET_KEY = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const user = await Student.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User   not found' });
    }
    
    // Fetch the user's payments
    const payments = await Payment.findAll({
      where: { student_id: userId },
      attributes: ['payment_id', 'paid_at', 'amount', 'status'],
    });
    
    // Return the user's payments
    const userPayments = {
      payment_id: user.payment_id,
      paid_at: user.paid_at,
      amount: user.amount,
      status: user.status
    };
    
   // In your route 
res.render('studentservices', { service: 'payments', userPayments: userPayments, payments: payments });
  
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
});


studentClasses.get('/dashboard/studentservices/enrolledClasses', async (req, res) => {
  const courses = await Course.findAll();
  res.render('studentservices', { service : 'enrolledClasses', courses });
});


export { studentPayments, studentClasses }; 