document.addEventListener('DOMContentLoaded', () => {
  const dog = document.querySelector('.dog');
  const sky = document.querySelector('.sky');
  const ground = document.querySelector('.ground');
  const gameDisplay = document.querySelector('.game-container');

  let dogLeft = 220;
  let dogBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 430;

  function startGame() {
    dogBottom -= gravity;
    dog.style.bottom = `${dogBottom}px`;
    dog.style.left = `${dogLeft}px`;
  }

  let gameTimerID = setInterval(startGame, 20);

  function jump() {
    if (dogBottom < 500) dogBottom += 50;
    dog.style.bottom = `${dogBottom}px`;
  }

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }
  document.addEventListener('keyup', control);

  function generateObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');
    if (!isGameOver) {
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = `${obstacleLeft}px`;
    topObstacle.style.left = `${obstacleLeft}px`;
    obstacle.style.bottom = `${obstacleBottom}px`;
    topObstacle.style.bottom = `${obstacleBottom + gap}px`;

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = `${obstacleLeft}px`;
      topObstacle.style.left = `${obstacleLeft}px`;

      if (obstacleLeft === -60) {
        clearInterval(timerID);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }

      if (
        (obstacleLeft > 200 &&
          obstacleLeft < 280 &&
          dogLeft === 220 &&
          (dogBottom < obstacleBottom + 148 ||
            dogBottom > obstacleBottom + gap - 200)) ||
        dogBottom === 0
      ) {
        gameOver();
        clearInterval(timerID);
      }
    }
    let timerID = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }

  generateObstacle();

  function gameOver() {
    clearInterval(gameTimerID);
    isGameOver = true;
    document.removeEventListener('keyup', control);
    document.querySelector('.game-over').style.display = 'block';
  }
});
