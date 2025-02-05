import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbconfig.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import routes
import { studentSignup, facultySignup, adminSignup, login } from './routes/authRoutes.js';
import { updateProfile } from './routes/profileRoutes.js'
import router from './routes/index.js';


// Import Models
import Student from './models/students.js';
import Course from './models/courses.js';
import StudentCourse from './models/student_courses.js';
import Payment from './models/payments.js';
import { registerCourse, unregisterCourse } from './routes/courseRoutes.js';


// Import dummydata
import dummyData from './dummydata.js';

// Define associations between models
Student.belongsToMany(Course, { through: StudentCourse });
Course.belongsToMany(Student, { through: StudentCourse });
Student.hasMany(Payment);
Payment.belongsTo(Student);

const app = express();  
app.use(express.json()); // allows destructuring

// Loads the environment variables from the .env file
dotenv.config();
const port = process.env.PORT || 3000;

// Syncs model with the database
sequelize.sync()
  .then(() => {
    // Create dummy data if it doesn't already exist
    dummyData.forEach((course) => {
      Course.findOne({ where: { course_name: course.course_name } })
        .then((existingCourse) => {
          if (!existingCourse) {
            Course.create(course).then((createdCourse) => {
              console.log(`Created course: ${createdCourse.course_name}`);
            });
          } else {
            console.log(`Course already exists: ${existingCourse.course_name}`);
          }
        });
    });
  })
  .catch((error) => {
    console.error(error);
  });

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the fintech-frontend directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set posting routes
app.post('/studentSignup', studentSignup);
app.post('/facultySignup', facultySignup);
app.post('/adminSignup', adminSignup);
app.post('/login', login);
app.post('/updateProfile', updateProfile);
app.post('/registerCourse', registerCourse)
app.delete('/unregisterCourse', unregisterCourse);



// Renders everything using a central router in ./routes/index.js
app.use('/', router);

// Handle 404 errors (this should always be the last route)
app.use((req, res) => {
    res.status(404).render('404'); // Render the 404.ejs file
  });
  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 

