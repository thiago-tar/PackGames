document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 9;
    let currentSnake = [2, 1, 0];
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;
    let lastArrow = "ArrowLeft";

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        lastArrow = "ArrowLeft";
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutComes, intervalTime);
    }

    function moveOutComes() {

        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snakehits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) ||// if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) ||// if snake hits  top
            squares[currentSnake[0] + direction].classList.contains('snake') // if  snake goes into itself
        ) {
            return clearInterval(interval) //this will clear if any of the above happen
        }

        const tail = currentSnake.pop(); //remove last item of the array and shows it
        squares[tail].classList.remove('snake'); // removes class of snake from the tail

        currentSnake.unshift(currentSnake[0] + direction); //gives direction to the head of the array

        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add['snake']
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutComes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple');
    }

    function control(e) {
        squares[currentIndex].classList.remove('snake');
        var key = e.key;
        if (arrows[key]) {
            arrows[key](key)
        }
    }
    
    const arrows = {
        ArrowDown(key) {
            if (key !== lastArrow)
                {
                    direction = + width
                    lastArrow = "ArrowUp"
                }
        },
        ArrowUp(key) {
            if (key !== lastArrow)
                {
                    direction = -width;
                    lastArrow = "ArrowDown"
                }
        },
        ArrowLeft(key) {
            if (key !== lastArrow)
            {
                direction = - 1;
                lastArrow = "ArrowRight"
            }
        },
        ArrowRight(key) {
            if (key !== lastArrow){
                direction = 1;
                lastArrow = "ArrowLeft"
            }
        }
    };

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame)

});