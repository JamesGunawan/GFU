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


// Get all the register buttons
const registerButtons = document.querySelectorAll('.register-button');

// Add an event listener to each button
registerButtons.forEach(button => {
  button.addEventListener('click', async function (e) {
    // Prevent default button behavior
    e.preventDefault();

    // Get the course ID from the button's data attribute
    const courseId = button.getAttribute('data-course-id');
    const studentId = sessionStorage.getItem('userId');

    // Prepare the data to send in the request body
    const registrationData = {
      studentId: studentId,
      courseId: courseId
    };

    try {
      // Send a POST request to the backend to register the student for the course
      const response = await fetch('/registerCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      // Check if the registration was successful
      if (response.ok) {
        alert('Successfully registered for the course!');
        // Update the UI to reflect the registration status
        button.textContent = 'Registered';
        button.disabled = true;
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error registering for course:', error);
      alert('An error occurred while registering for the course.');
    }
  });
});

