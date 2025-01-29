// Get the user type from sessionStorage
const userType = sessionStorage.getItem('userType');
const token = sessionStorage.getItem('jwt');

// Define the base URL for the profile page
const baseUrl = '/profile/';

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
  profileLink.href = `${baseUrl}${profileUrls[userType]}?token=${token}`;
}