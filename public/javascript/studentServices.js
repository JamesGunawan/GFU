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


// Gets the element id and route it with the token
const payments = document.getElementById('payments');
payments.onclick = function() {
  const token = sessionStorage.getItem('jwt');
  window.location.href = `/dashboard/studentservices/payments?token=${token}`;
}

const classes = document.getElementById('enrolledClasses');
classes.onclick = function() {
  const token = sessionStorage.getItem('jwt');
  window.location.href = `/dashboard/studentservices/enrolledClasses?token=${token}`;
}

// Get all the unregister buttons
const unregisterButtons = document.querySelectorAll('.unregister-button');

// Add an event listener to each button
unregisterButtons.forEach(button => {
  button.addEventListener('click', async function (e) {
    // Prevent default button behavior
    e.preventDefault();

    // Get the course ID from the button's data attribute
    const courseId = button.getAttribute('data-course-id');
    const studentId = sessionStorage.getItem('userId');

    // Prepare the data to send in the request body
    const unregistrationData = {
      studentId: studentId,
      courseId: courseId
    };

    try {
      // Send a DELETE request to the backend to unregister the student from the course
      const response = await fetch('/unregisterCourse', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(unregistrationData),
      });

      const result = await response.json();

      // Check if the unregistration was successful
      if (response.ok) {
        alert('Successfully unregistered from the course!');
        // Update the UI to reflect the unregistration status
        button.textContent = 'Unregistered';
        button.disabled = true;
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error unregistering from course:', error);
      alert('An error occurred while unregistering from the course.');
    }
  });
}); 