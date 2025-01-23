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
const SECRET_KEY = process.env.JWT_SECRET; // Load the secret key for JWT from .env

const login = async (req, res) => {
  const { credentials, password } = req.body; // Destructuring credentials and password from request body

  console.log('Login attempt with credentials:', credentials);

  try {
    let user = null; // Placeholder for user object
    let userType = ''; // To store the user type for identifying the table and ID

    if (credentials.includes('@')) {
      // If credentials is an email
      console.log('Credentials identified as an email');
      if (credentials.includes('@student.gfu.edu')) {
        user = await Student.findOne({ where: { username: credentials } });
        userType = 'student';
      } else if (credentials.includes('@faculty.gfu.edu')) {
        user = await Faculty.findOne({ where: { username: credentials } });
        userType = 'faculty';
      } else if (credentials.includes('@admin.gfu.edu')) {
        user = await Admin.findOne({ where: { username: credentials } });
        userType = 'admin';
      } else {
        user = await Admin.findOne({ where: { email: credentials } }) ||
               await Faculty.findOne({ where: { email: credentials } }) ||
               await Student.findOne({ where: { email: credentials } });
    
        userType = user instanceof Student ? 'student' :
                   user instanceof Faculty ? 'faculty' :
                   user instanceof Admin ? 'admin' : null;
      }
    } else if (credentials.includes('@student.gfu.edu')) {
      // If credentials is a student username
      console.log('Credentials identified as a Student username');
      user = await Student.findOne({ where: { username: credentials } });
      userType = 'student';
    } else if (credentials.includes('@faculty.gfu.edu')) {
      // If credentials is a faculty username
      console.log('Credentials identified as a Faculty username');
      user = await Faculty.findOne({ where: { username: credentials } });
      userType = 'faculty';
    } else {
      // Assuming any other username is an Admin username
      console.log('Credentials identified as an Admin username');
      user = await Admin.findOne({ where: { username: credentials } });
      userType = 'admin';
    }

    if (!user) {
      // If no user is found  
      console.log('No user found for provided credentials:', credentials);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User found:`, user);

    // Compare provided password with the hashed password in the database
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log('Invalid password for user:', credentials);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Password validation successful');

    // Determine the user ID field based on the user type
    const userIdField =
      userType === 'student'
        ? 'student_id'
        : userType === 'faculty'
        ? 'faculty_id'
        : userType === 'admin'
        ? 'admin_id'
        : 'user_id'; // Default fallback for general email-based login

    // Generate a JWT
    const token = jwt.sign(
      {
        userId: user[userIdField],
        email: user.email || null,
        username: user.username || null,
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    console.log('JWT generated successfully:', token);

    // Respond with the token and userId
    res.json({ token, userId: user[userIdField], userType });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};



export { studentSignup, facultySignup, adminSignup, login };