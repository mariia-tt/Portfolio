document.querySelectorAll('.toggle-button').forEach((button) => {
    button.addEventListener('click', (event) => {
        const resume = event.target.parentNode;
        const extendedResume = resume.querySelector('.extended-resume');
        extendedResume.style.display = extendedResume.style.display === 'block'? 'none' : 'block';
        
        // Close other extended resumes
        document.querySelectorAll('.extended-resume').forEach((otherExtendedResume) => {
            if (otherExtendedResume!== extendedResume) {
                otherExtendedResume.style.display = 'none';
            }
        });
    });
});
