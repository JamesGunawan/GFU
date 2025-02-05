import Course from "./models/courses.js";

const course1 = {
    course_name: 'Introduction to Computer Science',
    description: 'This course provides an introduction to the fundamental concepts of computer science.',
    credits: 3,
    professor: 'John Doe',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '10:00 AM - 11:15 AM'
    },
    fee: 500.00
  };
  
  const course2 = {
    course_name: 'Data Structures and Algorithms',
    description: 'This course covers the design and analysis of algorithms and data structures.',
    credits: 4,
    professor: 'Jane Smith',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '2:00 PM - 3:50 PM'
    },
    fee: 600.00
  };
  
  const course3 = {
    course_name: 'Web Development',
    description: 'This course introduces students to the basics of web development using HTML, CSS, and JavaScript.',
    credits: 3,
    professor: 'Bob Johnson',
    schedule: {
      days: ['Monday', 'Wednesday'],
      time: '1:00 PM - 2:50 PM'
    },
    fee: 550.00
  };
  
  const dummyData = [course1, course2, course3];
  
  export default dummyData; 