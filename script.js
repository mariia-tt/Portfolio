// Add event listener to each team member section
document.querySelectorAll('.team-member').forEach((member) => {
    member.addEventListener('mouseover', () => {
        member.style.backgroundColor = '#f7f7f7';
    });
    member.addEventListener('mouseout', () => {
        member.style.backgroundColor = '';
    });
});
