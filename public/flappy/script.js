document.addEventListener('DOMContentLoaded' , () => {
    /* Wait for all HTML to load first*/
    /*Pick out element, bird, by grabbing document and passing thru a string of class bird*/
    /*Make const so you can use again and again*/
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220; //spacing for left side of bird
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let gap = 430;

    function startGame() {
        birdBottom -= gravity; //bird will drop
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    /*Execute dropping bird in loop, passes thru function every 20 milliseconds*/
    let gameTimerId = setInterval(startGame, 20);
    /*Allows stopping particular setInterval from running
    clearInterval(timerId);*/

    /*Specifically space bar makes jump
    e is short for event, 32 is keycode for spacebar */
    function control(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        /*Adding 50px every time we jump*/
        if (birdBottom < 500) { 
            birdBottom += 50; 
        }
        bird.style.bottom = birdBottom + 'px';
        /*Track dimension bird leaves page: */
        console.log(birdBottom);
    }
    /* Each time finger leaves key, invoke jump function 
    Instead of jump, event is now control */
    document.addEventListener('keyup', control); 

    /* Create a div obstacle and put into game container*/
    function generateObstacle() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        
        if (!isGameOver) {
            obstacle.classList.add('obstacle'); // add class of obstacle to this div
            topObstacle.classList.add('topObstacle'); // add class of obstacle to this div
        } 
        
        
        /* Select the div container that gameDisplay is selecting */
        gameDisplay.appendChild(obstacle); // putting div into game container
        gameDisplay.appendChild(topObstacle);
        /*Positioning*/
        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle() {
            obstacleLeft -=2;
            obstacle.style.left = obstacleLeft + 'px'; // styles obstacle to move left
            topObstacle.style.left = obstacleLeft + 'px';

            /* Stop obstacle once completely out of view */
            if (obstacleLeft === -60) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }

            /* If obstacle is not in last 200 px of its travels, in middle of grid, and bird is in normal position.
            Or if bird reaches bottom, it loses. 
            birdBottom is in sky grid, so 0 means it's at bottom of it */
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200 ||
                birdBottom === 0
                ) {
                gameOver();
                clearInterval(timerId);
            }
            
        }
        let timerId = setInterval(moveObstacle, 20);
        /* Generate new obstacles once old ones gone 
        Pass through a time before executing new obstacle every 3 seconds */
        if (!isGameOver) setTimeout(generateObstacle, 3000);
    }
    generateObstacle();

    function gameOver() {
        clearInterval(gameTimerId); //clear startGame from running
        console.log('game over');
        isGameOver = true;
        document.removeEventListener('keyup', control);
    }
})