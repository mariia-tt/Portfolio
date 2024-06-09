// Add event listener to each toggle button
document.querySelectorAll('.toggle-button').forEach((button) => {
    button.addEventListener('click', () => {
        const extendedResume = button.nextElementSibling;
        extendedResume.style.display = extendedResume.style.display === 'block'? 'none' : 'block';
    });
});