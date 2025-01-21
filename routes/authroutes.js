import Admin from '../models/admin.js';
import Faculty from '../models/faculty.js';
import Student from '../models/students.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const studentSignup = async (req, res) => {
  const {first_name, last_name, email, password} = req.body;  // Destructuring request body for username, email, and password
 try {
    // Check if the email already exists in any of the models
    const [existingStudent, existingFaculty, existingAdmin] = await Promise.all([
        Student.findOne({ where: { email } }),
        Faculty.findOne({ where: { email } }),
        Admin.findOne({ where: { email } })
    ]);
    if (existingStudent || existingFaculty || existingAdmin) {
        return res.status(400).json({ message: 'Email already in use' }); // Return
    }

    // Creating a new student in the database
    const newStudent  = await Student.create({ first_name, last_name, email, password });
    res.status(201).json(newStudent); // Responding with the newly created student
    } catch (error) {
      // Handle other errors (e.g., database errors)
      console.error('Error signing up student:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error signing up student', error: error.message });  // Return a generic error message
    }
};

const facultySignup = async (req, res) => {
  const {first_name, last_name, email, password} = req.body;  // Destructuring request body for username, email, and password
  try {
    // Check if the email already exists in any of the models
    const [existingStudent, existingFaculty, existingAdmin] = await Promise.all([
        Student.findOne({ where: { email } }),
        Faculty.findOne({ where: { email } }),
        Admin.findOne({ where: { email } })
    ]);
    if (existingStudent || existingFaculty || existingAdmin) {
        return res.status(400).json({ message: 'Email already in use' }); // Return
    }

    // Creating a new student in the database
    const newFaculty  = await Faculty.create({ first_name, last_name, email, password });
    res.status(201).json(newFaculty); // Responding with the newly created student
    } catch (error) {
      // Handle other errors (e.g., database errors)
      console.error('Error signing up student:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error signing up faculty', error: error.message });  // Return a generic error message
    }
};

const adminSignup = async (req, res) => {
  const {username, email, password} = req.body;  // Destructuring request body for email, and password
  try {
    // Check if the email already exists in any of the models
    const [existingStudent, existingFaculty, existingAdmin] = await Promise.all([
        Student.findOne({ where: { email } }),
        Faculty.findOne({ where: { email } }),
        Admin.findOne({ where: { email } })
    ]);
    if (existingStudent || existingFaculty || existingAdmin) {
        return res.status(400).json({ message: 'Email already in use' }); // Return
    }

    // Creating a new student in the database
    const newAdmin  = await Admin.create({ username, email, password });
    res.status(201).json(newAdmin); // Responding with the newly created student
    } catch (error) {
      // Handle other errors (e.g., database errors)
      console.error('Error signing up student:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error signing up admin', error: error.message });  // Return a generic error message
    }
};

// Login user
const login = async (req, res) => {
  const { credential, password } = req.body; // Use `credential` from the frontend
  try {
    if (!credential || !password) {
      return res.status(400).json({ messages: 'Email/Username and password are required' });
    }

    let user, userType;

    // Check if it's an email or username
    if (credential.includes('@')) {
      // Check for student email
      if (credential.includes('@student.gfu.edu')) {
        user = await Student.findOne({ where: { email: credential } });
        userType = 'student';
      }
      // Check for faculty email
      else if (credential.includes('@faculty.gfu.edu')) {
        user = await Faculty.findOne({ where: { email: credential } });
        userType = 'faculty';
      }
      // Check for admin email
      else {
        user = await Admin.findOne({ where: { email: credential } });
        userType = 'admin';
      }
    } else {
      // Handle username-based login
      // Admin can have any username
      user = await Admin.findOne({ where: { username: credential } }) || 
             await Faculty.findOne({ where: { username: credential } }) || 
             await Student.findOne({ where: { username: credential } });
      
      userType = user instanceof Student ? 'student' : 
                 user instanceof Faculty ? 'faculty' : 
                 user instanceof Admin ? 'admin' : null;
    }

    if (!user || !userType) {
      return res.status(404).json({ messages: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ messages: 'Invalid credentials' });
    }

    // If login is successful, generate a JWT
    const token = jwt.sign(
      { userId: user.user_id, email: user.email || user.username, userType },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token, userId: user.user_id, userType });
  } catch (error) {
    console.error('Login Error:', error); // Log the error for debugging
    res.status(500).json({ messages: 'Error logging in', error });
  }
};


export { studentSignup, facultySignup, adminSignup, login };