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