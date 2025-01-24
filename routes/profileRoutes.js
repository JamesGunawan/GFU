import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/students.js';
import Faculty from '../models/faculty.js';
import Admin from '../models/admin.js';

const studentProfile = express.Router();
const facultyProfile = express.Router();
const adminProfile = express.Router();

studentProfile.get('/profile/studentProfile', async (req, res) => {
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
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user's profile
      const userProfile = {
        id: user.student_id, 
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        dob: user.dob,
        phone: user.phone,  
        address: user.address,
        type: 'Student ID : '
      };
  
      // Render the profile page with the user's data
      res.render('profile', { profile: userProfile });
  
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
  });
  
// Faculty profile route
facultyProfile.get('/profile/facultyProfile', async (req, res) => {
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
      const user = await Faculty.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user's profile
      const userProfile = {
        id: user.faculty_id, 
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        dob: user.dob,
        phone: user.phone,  
        address: user.address,
        type: 'Faculty ID : '
      };
  
      // Render the profile page with the user's data
      res.render('profile', { profile: userProfile });
  
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
  });

// Admin profile route
adminProfile.get('/profile/adminProfile', async (req, res) => {
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
      const user = await Admin.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user's profile
      const userProfile = {
        id: user.admin_id, 
        username: user.username,
        email: user.email,
        type: 'Admin ID : '
      };
  
      // Render the profile page with the user's data
      res.render('profile', { profile: userProfile });
  
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
  });


export { studentProfile, facultyProfile, adminProfile };