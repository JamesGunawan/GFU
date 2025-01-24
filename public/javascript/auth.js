// FLipbox class to flip the form
document.getElementById('login_button').addEventListener('click', () => {
    document.querySelector('.flipbox_inner').classList.add('flipped');
});
document.getElementById('signup_button').addEventListener('click', () => {
  document.querySelector('.flipbox_inner').classList.remove('flipped');
});

// Changes the display for admin (a bit messy since putting them in a div breaks the css, so i had to do it in another way)
document.getElementById('sign_up_type').addEventListener('change', function () {
  const accountType = this.value;
  const first_name_input = document.getElementById('signup_first_name');
  const last_name_input = document.getElementById('signup_last_name');
  const username_input = document.getElementById('signup_username');
  const first_name_label = document.querySelector('label[for="signup_first_name"]');
  const last_name_label = document.querySelector('label[for="signup_last_name"]');
  const username_label = document.querySelector('label[for="signup_username"]');

  if (accountType === 'admin') {
    // Hide first and last name fields
    first_name_input.classList.add('hidden');
    last_name_input.classList.add('hidden');
    first_name_label.classList.add('hidden');
    last_name_label.classList.add('hidden');
    first_name_input.removeAttribute('required');
    last_name_input.removeAttribute('required');

    // Show username field and make it required
    username_input.classList.remove('hidden');
    username_label.classList.remove('hidden');
    username_input.setAttribute('required', '');
  } else {
    // Show first and last name fields
    first_name_input.classList.remove('hidden');
    last_name_input.classList.remove('hidden');
    first_name_label.classList.remove('hidden');
    last_name_label.classList.remove('hidden');
    first_name_input.setAttribute('required', '');
    last_name_input.setAttribute('required', '');

    // Hide username field
    username_input.classList.add('hidden');
    username_label.classList.add('hidden');
    username_input.removeAttribute('required');
  }
});


// Sign up form validation
document.getElementById('signUpForm').addEventListener('submit', async function (e) {
  e.preventDefault();  // Prevent the default form submission

  // Get form values
  const username = document.getElementById('signup_username').value;
  const first_name = document.getElementById('signup_first_name').value;
  const last_name = document.getElementById('signup_last_name').value;
  const email = document.getElementById('signup_email').value;
  const password = document.getElementById('signup_password').value;
  const match_password = document.getElementById('password_confirmation').value;
  const signupType = document.getElementById('sign_up_type').value;
  const message = document.getElementById('message');

  // Clear the message div before submitting
  document.getElementById('message').textContent = '';

  // Simple password check confirmation
  function passwordCheck(password, match_password) {
    if (password !== match_password) {
      message.textContent = 'Passwords do not match';
      return false;
    }
    return true;
  }

  // Create an object to send in the request body
  const signupData = {
    username,
    first_name,
    last_name,
    email,
    password
  };

  const validSignupTypes = {
    student: '/studentSignup',
    faculty: '/facultySignup',
    admin: '/adminSignup',
  };

    // Validate signup type
    if (!validSignupTypes[signupType]) {
      message.textContent = 'Invalid signup type selected.';
      message.style.color = 'red';
      return;
  };

  // Compare password and confirm password
  try {
    if (!passwordCheck(password, match_password)) { 
      return; // Stop the function if passwords don't match
    }
  } catch (error) {
    message.textContent = 'Error validating passwords.';
    message.style.color = 'red';
    return;
  }

  try {
    const endpoint = validSignupTypes[signupType];

    // Send a POST request to the backend to create a new user
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    const result = await response.json();

    // If the response is successful, redirect them
    if (response.status === 201) {
      window.location.href = `/profile${endpoint}`;
    } else {
      message.textContent = result.message || 'An error occurred.';
      message.style.color = 'red';
    }
  } catch (error) {
    message.textContent = 'Error connecting to the server.';
    message.style.color = 'red';
  }
});

// Login form validation
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent default form submission

  // Get form values
  const credentials = document.getElementById('login_credential').value; // Can be username or email
  const password = document.getElementById('login_password').value;
  const message = document.getElementById('messages');

  // Prepare the data to send in the request body
  const loginData = {
    credentials, // Pass credential as username or email
    password
  };

  try {
    // Send a POST request to the backend login endpoint
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    // Check if login was successful
    if (response.ok) {
      const token = result.token; // Token returned from the server
      const userId = result.userId; // User ID returned from the server
      const userType = result.userType; // User type returned from the server

      // Store the token and userId in sessionStorage //change this to cookie based to be more secure
      sessionStorage.setItem('jwt', token);
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('userType', userType)

      // Define redirection paths 
      const validLoginTypes = {
        student: '/studentProfile',
        faculty: '/facultyProfile',
        admin: '/adminProfile',
      };

      // Determine redirection path based on userType
      const redirectPath = validLoginTypes[userType];
      if (redirectPath) {
        window.location.href = `/profile${redirectPath}?token=${token}`;
      } else {
        message.textContent = 'Unknown user type.';
        message.style.color = 'red';
      }
    } else {
      message.textContent = result.message || 'Invalid username/email or password.';
      message.style.color = 'red';
      message.style.zIndex = '1';
      message.style.marginTop = '10px';
    }
  } catch (error) {
    message.textContent = 'Error connecting to the server.';
    message.style.color = 'red';
  }
});


