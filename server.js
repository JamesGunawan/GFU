import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbconfig.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import models
import Student from './models/students.js';
import Course from './models/courses.js';
import Payments from './models/payments.js';
import StudentCourses from './models/student_courses.js';
import Admin from './models/admin.js';
import Faculty from './models/faculty.js';

// Import routes
import { studentSignup, facultySignup, adminSignup, login } from './routes/authroutes.js';

const app = express();  
app.use(express.json()); // allows destructuring

// Loads the environment variables from the .env file
dotenv.config();
const port = process.env.PORT || 3000;

// Syncs model with the database
sequelize.sync(); 

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the fintech-frontend directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set auth routes
app.post('/studentSignup', studentSignup);
app.post('/facultySignup', facultySignup);
app.post('/adminSignup', adminSignup);
app.post('/login', login);


// Renders root as auth page
app.get('/', (req, res) => {
    res.render('auth');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 


// ?