import express from 'express';

const studentDashboard = express.Router();
const facultyDashboard = express.Router();
const adminDashboard = express.Router();

studentDashboard.get('/profile/studentProfile', async (req, res) => {
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

