let score = 0;
let missed = 0;
let startTime;
let intervalId;
let circleTimeoutIds = [];
let createCircleIntervalId;
let catchTimes = [];

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('game-over').addEventListener('click', gameOver);

function startGame() {
    score = 0;
    missed = 0;
    catchTimes = [];
    startTime = new Date().getTime();
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('missed').textContent = `Missed: ${missed}`;

    createCircleIntervalId = setInterval(createCircle, Math.random() * 1000 + 1000);
    document.getElementById('start-game').disabled = true;
}

function createCircle() {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.top = `${Math.random() * 350}px`;
    circle.style.left = `${Math.random() * 350}px`;
    document.getElementById('game-area').appendChild(circle);
    circle.addEventListener('click', catchCircle);

    const appearTime = new Date().getTime();
    let isCaught = false;

    const timeoutId = setTimeout(() => {
        if (!isCaught) {
            circle.remove();
            missed++;
            document.getElementById('missed').textContent = `Missed: ${missed}`;
        }
    }, 2000);

    circleTimeoutIds.push(timeoutId);

    function catchCircle() {
        isCaught = true;
        const catchTime = new Date().getTime();
        const reactionTime = (catchTime - appearTime) / 1000;
        catchTimes.push(reactionTime);

        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        clearTimeout(timeoutId);
        this.remove();
    }
}

setInterval(() => {
    if (startTime) {
        const currentTime = new Date().getTime();
        const timeSpent = (currentTime - startTime) / 1000;
    }
}, 1000);

function gameOver() {
    clearInterval(createCircleIntervalId);
    circleTimeoutIds.forEach(clearTimeout);
    circleTimeoutIds = [];
    document.querySelectorAll('.circle').forEach(circle => circle.remove());
    document.getElementById('start-game').disabled = false;

    const endTime = new Date().getTime();
    const timeSpent = (endTime - startTime) / 1000;
    const averageCatchTime = catchTimes.length ? (catchTimes.reduce((a, b) => a + b, 0) / catchTimes.length).toFixed(2) : 0;

    alert(`Game over! You caught ${score} circles and missed ${missed} circles. Your game time was ${timeSpent.toFixed(2)} seconds. Average catch time: ${averageCatchTime} seconds.`);

    // Reset scores and time
    score = 0;
    missed = 0;
    startTime = null;
    catchTimes = [];
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('missed').textContent = `Missed: ${missed}`;
}
