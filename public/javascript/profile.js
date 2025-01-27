// Changes the h4 fields into input fields
document.querySelector('.edit-button').addEventListener('click', () => {
    // Show the Save button and hide the Edit button
    document.querySelector('.save-button').style.display = 'inline-block';
    document.querySelector('.edit-button').style.display = 'none';

    // Get user type from sessionStorage
    const isAdmin = sessionStorage.getItem('userType') === 'admin';

    // Select all h4 elements in the info-container
    const h4Elements = document.querySelectorAll('.info-container h4');

    h4Elements.forEach(h4 => {
        const id = h4.id;

        // Prevent editing 'username', 'first_name', and 'last_name' for non-admins
        if ((id === 'username' || id === 'first_name' || id === 'last_name') && !isAdmin) {
            return;
        }

        // Replace with specific input types based on the field
        const input = document.createElement('input');
        if (id === 'dob') {
            input.type = 'date'; // Use date input for Date of Birth
        } else {
            input.type = 'text'; // Default to text input
        }
        input.value = h4.textContent; // Set the current text as the value
        input.className = 'editable-input';
        input.id = id; // Preserve the ID for saving later
        h4.parentNode.replaceChild(input, h4);
    });
});

// Updates the user profile
document.querySelector('.save-button').addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    
    // Show the Edit button and hide the Save button
    document.querySelector('.edit-button').style.display = 'inline-block';
    document.querySelector('.save-button').style.display = 'none';
    

    // Get user type and user ID from sessionStorage or decoded JWT token
    const userType = sessionStorage.getItem('userType'); // Example: 'student', 'admin'
    const userId = sessionStorage.getItem('userId'); // Assuming you stored the userId in sessionStorage

    // If the user is not authenticated or doesn't exist, show an error
    if (!userType || !userId) {
        alert('User is not authenticated');
        return;
    }

    // Prepare the updated profile data
    const username = document.getElementById('username').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const updateUser = {
        username,
        first_name,
        last_name,
        email,
        dob,
        phone,
        address,
        userType,
        userId
    };

    // Revert the input fields back to <h4> elements and set the content to the updated values
    const editableInputs = document.querySelectorAll('.editable-input');
    editableInputs.forEach(input => {
        const h4 = document.createElement('h4');
        h4.id = input.id;
        const inputValue = input.value.trim(); // Trim the input value to remove whitespace
        h4.textContent = inputValue === '' ? 'No Date of Birth' : inputValue; // Set the text to the new value from the input, or "No Date of Birth" if empty
        input.parentNode.replaceChild(h4, input); // Replace the input with the updated <h4>
    });

    // Send the updated data to the backend for saving
    try {
        const response = await fetch('/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateUser), // Send the updateUser object directly
        });

        const result = await response.json();

        // Check if the update was successful
        if (response.ok) {
            alert('Profile updated successfully!');
        } else {
            alert(`Error updating profile: ${result.message}`);
        }
    } catch (error) {
        console.error('Error updating profile:', error, updateUser);
        alert('Error updating profile');
    }
});
