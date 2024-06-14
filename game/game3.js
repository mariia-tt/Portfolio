// Add event listener to each team member section

// draw the border
context.strokeStyle = 'black';
context.lineWidth = 3;
context.strokeRect(0, 0, canvas.width, canvas.height);
// Add event listener to each team member section
document.querySelectorAll('.team-member').forEach((member) => {
    member.addEventListener('mouseover', () => {
        member.style.backgroundColor = '#f7f7f7';
    });
    member.addEventListener('mouseout', () => {
        member.style.backgroundColor = '';
    });
  });
  
  // Add event listener to each toggle button
  document.querySelectorAll('.toggle-button').forEach((button) => {
    button.addEventListener('click', () => {
        const extendedResume = button.nextElementSibling;
        extendedResume.style.display = extendedResume.style.display === 'block' ? 'none' : 'block';
    });
  });
  
  document.querySelectorAll(".toggle-button").forEach((button) => {
    button.addEventListener("click", (event) => {
        const resume = event.target.parentNode;
        const extendedResume = resume.querySelector(".extended-resume");
        extendedResume.style.display =
            extendedResume.style.display === "block" ? "none" : "block";
  
        // Close other extended resumes
        document
            .querySelectorAll(".extended-resume")
            .forEach((otherExtendedResume) => {
                if (otherExtendedResume !== extendedResume) {
                    otherExtendedResume.style.display = "none";
                }
            });
    });
  });