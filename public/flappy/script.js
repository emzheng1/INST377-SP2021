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

    function startGame() {
        birdBottom -= gravity; //bird will drop
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    /*Execute dropping bird in loop, passes thru function every 20 milliseconds*/
    let timerId = setInterval(startGame, 20);
    /*Allows stopping particular setInterval from running*/
    /*clearInterval(timerId);*/

    function jump() {
        /*Adding 50px every time we jump*/
        if (birdBottom < 500) { 
            birdBottom += 50; 
        }
        bird.style.bottom = birdBottom + 'px';
        /*Track dimension bird leaves page: */
        console.log(birdBottom);
    }
    /* Each time finger leaves key, invoke jump function */
    document.addEventListener('keyup', jump); 
})