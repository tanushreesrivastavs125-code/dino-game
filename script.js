const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
let isJumping = false;
let score = 0;
let scoreInterval;
let gameLoop;
let isGameOver = false;


document.addEventListener('keydown', function (e) {
  if (e.code === 'Space' && !isJumping && !isGameOver) {
    jump();
  }
});

function jump() {
  isJumping = true;
  dino.classList.add('jump');
  setTimeout(() => {
    dino.classList.remove('jump');
    isJumping = false;
  }, 600);
}


function moveObstacle() {
  let obstacleLeft = 800;

  gameLoop = setInterval(() => {
    if (obstacleLeft < -40) {
      obstacleLeft = 800;
      increaseScore();
    }

    obstacleLeft -= 10;
    obstacle.style.left = obstacleLeft + 'px';

    
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    if (obstacleLeft < 90 && obstacleLeft > 40 && dinoTop < 40) {
      endGame();
    }
  }, 20);
}

function increaseScore() {
  score += 1;
  document.getElementById('score').innerText = 'Score: ' + score;
}


function startScoring() {
  scoreInterval = setInterval(() => {
    score++;
    document.getElementById('score').innerText = "Score: " + score;
  }, 100);
}


function endGame() {
  isGameOver = true;
  clearInterval(gameLoop);
  clearInterval(scoreInterval);
  document.getElementById("finalScore").innerText = score;
  document.getElementById("gameOver").style.display = "block";
}


function restartGame() {
  location.reload();
}


window.onload = () => {
  moveObstacle();
  startScoring();
};