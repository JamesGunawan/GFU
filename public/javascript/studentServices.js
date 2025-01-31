// Get the user type from sessionStorage
const userType = sessionStorage.getItem('userType');
const token = sessionStorage.getItem('jwt');

// Define the base URL for the profile page
const profileUrl = '/profile/';

// Define the profile page URLs for each user type
const profileUrls = {
  admin: 'adminProfile',
  student: 'studentProfile',
  faculty: 'facultyProfile',
};

// Get the anchor tag element
const profileLink = document.querySelector('a[href="/profile"]');

// Update the href attribute based on the user type
if (userType && profileUrls[userType]) {
  profileLink.href = `${profileUrl}${profileUrls[userType]}?token=${token}`;
}

// Define the base URL for the dashboard page
const dashboardUrl = '/dashboard/';

// Define the dashboard page URLs for each user type
const dashboardUrls = {
  admin: 'adminDashboard',
  student: 'studentDashboard',
  faculty: 'facultyDashboard',
};

// Get the anchor tag element
const dashboardLink = document.querySelector('a[href="/dashboard"]');

// Update the href attribute based on the user type
if (userType && dashboardUrls[userType]) {
  dashboardLink.href = `${dashboardUrl}${dashboardUrls[userType]}?token=${token}`;
}

// Get the enrolled classes sidebar item
const enrolledClassesItem = document.getElementById('enrolledClasses');

// Add an event listener to the enrolled classes sidebar item
enrolledClassesItem.addEventListener('click', async function () {
    // Get the token from sessionStorage
    const token = sessionStorage.getItem('jwt');

    try {
        // Fetch the enrolled courses for the student
        const response = await fetch(`http://localhost:3000/courses/enrolledCourses?token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const enrolledCourses = await response.json();

        // Render the enrolled courses in the details section
        const detailsSection = document.querySelector('.details');
        detailsSection.innerHTML = '';

        enrolledCourses.forEach((course) => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';

            const courseName = document.createElement('h3');
            courseName.textContent = course.course_name;

            const professor = document.createElement('p');
            professor.textContent = `Professor: ${course.professor}`;

            const days = document.createElement('p');
            days.textContent = `Days: ${course.schedule.days.join(', ')}`;

            const time = document.createElement('p');
            time.textContent = `Time: ${course.schedule.time}`;

            const enrollmentCost = document.createElement('p');
            enrollmentCost.textContent = `Enrollment Cost: $${course.fee}`;

            const credits = document.createElement('p');
            credits.textContent = `Credits: ${course.credits}`;

            courseCard.appendChild(courseName);
            courseCard.appendChild(professor);
            courseCard.appendChild(days);
            courseCard.appendChild(time);
            courseCard.appendChild(enrollmentCost);
            courseCard.appendChild(credits);

            detailsSection.appendChild(courseCard);
        });
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
    }
});