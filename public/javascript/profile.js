document.querySelector('.edit-button').addEventListener('click', () => {
    // Show the Save button and hide the Edit button
    document.querySelector('.save-button').style.display = 'inline-block';
    document.querySelector('.edit-button').style.display = 'none';

    // Convert all h4 elements to inputs
    const h4Elements = document.querySelectorAll('.info-container h4');
    h4Elements.forEach(h4 => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = h4.textContent;
        input.className = 'editable-input';
        h4.parentNode.replaceChild(input, h4);
    });
});

document.querySelector('.save-button').addEventListener('click', () => {
    // Show the Edit button and hide the Save button
    document.querySelector('.edit-button').style.display = 'inline-block';
    document.querySelector('.save-button').style.display = 'none';

    // Convert all inputs back to h4 elements
    const inputElements = document.querySelectorAll('.info-container .editable-input');
    inputElements.forEach(input => {
        const h4 = document.createElement('h4');
        h4.textContent = input.value;
        input.parentNode.replaceChild(h4, input);
    });
});
