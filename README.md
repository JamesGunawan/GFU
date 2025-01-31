GFU (Greenfield University) 
Project Overview
================

The GFU project is a web application designed to manage student, faculty, and admin profiles, course registrations, and authentication for a university system. It includes features like user signup, login, profile management, course enrollment, and dashboard views for different user roles.

Technologies Used
-----------------

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express.js
* Database: MySQL (via Sequelize ORM)
* Authentication: JSON Web Tokens (JWT)
* Templating Engine: EJS
* Password Hashing: bcrypt
* Environment Management: dotenv

Project Structure
-----------------

### Backend

#### Routes

* `authRoutes.js`: Handles user authentication (signup, login).
* `profileRoutes.js`: Manages user profile updates and views.
* `courseRoutes.js`: Handles course registration and unregistration.
* `dashboardRoutes.js`: Manages dashboard views for students, faculty, and admins.
* `publicRoutes.js`: Handles public routes like the homepage and profile pages.
* `index.js`: Central router for all routes.

#### Models

* `students.js`: Defines the Student model.
* `faculty.js`: Defines the Faculty model.
* `admin.js`: Defines the Admin model.
* `courses.js`: Defines the Course model.
* `student_courses.js`: Defines the StudentCourse model for course enrollment.
* `payments.js`: Defines the Payment model for course fees.

#### Database Configuration

* `dbconfig.js`: Configures the Sequelize connection to the MySQL database.

#### Server

* `server.js`: Entry point for the application. Sets up Express, routes, and database associations.

### Frontend

#### CSS

* `auth.css`: Styles for the authentication pages.
* `profile.css`: Styles for the profile page.
* `dashboard.css`: Styles for the dashboard page.
* `courses.css`: Styles for the course registration page.
* `studentServices.css`: Styles for the student services page.
* `404.css`: Styles for the 404 error page.

#### JavaScript

* `auth.js`: Handles authentication form submissions and UI logic.
* `profile.js`: Manages profile editing and updates.
* `dashboard.js`: Handles dashboard navigation and user-specific views.
* `courses.js`: Manages course registration and unregistration.
* `studentServices.js`: Handles student services functionality.

Features
--------

### Authentication

* Signup: Users can sign up as students, faculty, or admins.
* Login: Users can log in using their email or username.
* JWT Authentication: Secure token-based authentication for user sessions.

### Profile Management

* View Profile: Users can view their profile details.
* Edit Profile: Users can update their profile information (e.g., name, email, address).

### Course Management

* Course Registration: Students can register for courses.
* Course Unregistration: Students can unregister from courses.
* Course List: Displays available courses with details like schedule, professor, and fees.

### Dashboard

* Student Dashboard: Displays student-specific information.
* Faculty Dashboard: Displays faculty-specific information.
* Admin Dashboard: Displays admin-specific information.

### Student Services

* Enrolled Courses: Displays a list of courses the student is enrolled in.

Installation
------------

### Clone the Repository

```bash
git clone <repository-url>
cd GFU
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### Database Setup

Ensure MySQL is installed and running.

```bash
node server.js
```

### Run the Application

```bash
npm start
```

The application will be available at `http://localhost:3000`.

Usage
-----

### Signup

Navigate to the signup page and create an account as a student, faculty, or admin.

### Login

Use your credentials to log in and access your dashboard.

### Profile

View and edit your profile details.

### Courses

Browse available courses and register/unregister as needed.

### Dashboard

Access your personalized dashboard based on your role.

API Endpoints
-------------

### Authentication

* `POST /studentSignup`: Sign up as a student.
* `POST /facultySignup`: Sign up as faculty.
* `POST /adminSignup`: Sign up as an admin.
* `POST /login`: Log in as a user.

### Profile

* `GET /profile/studentProfile`: View student profile.
* `GET /profile/facultyProfile`: View faculty profile.
* `GET /profile/adminProfile`: View admin profile.
* `POST /updateProfile`: Update user profile.

### Courses

* `GET /dashboard/courses`: View available courses.
* `POST /registerCourse`: Register for a course.
* `DELETE /unregisterCourse`: Unregister from a course.

Dependencies
------------

### Backend

* `express`: Web framework.
* `sequelize`: ORM for MySQL.
* `bcrypt`: Password hashing.
* `jsonwebtoken`: JWT authentication.
* `dotenv`: Environment variable management.
* `ejs`: Templating engine.

### Frontend

* `Vanilla JavaScript` for dynamic functionality.

Contributing
------------

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

License
-------

This project is licensed under the ISC License. See the LICENSE file for details.

Contact
-------

For any questions or issues, please contact the project maintainer.