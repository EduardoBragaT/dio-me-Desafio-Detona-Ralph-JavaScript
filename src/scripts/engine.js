const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentPosition: 0,
    },
    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function restartInterval(action, func, timer) {
    if (action) {
        clearInterval(action);
    }
    return setInterval(func, timer);
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`../../assets/audio/${audioName}.m4a`);
    audio.volume = 0.05;
    audio.play();
}
function randomSquare() {
    state.view.squares.forEach((square) => {
        if (square.classList.contains("enemy")) {
            square.classList.remove("enemy");
        }
    });
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 9);
    } while (randomNumber == state.values.currentPosition);
    let randomSquareEnemy = state.view.squares[randomNumber];
    randomSquareEnemy.classList.toggle("enemy");
    state.values.hitPosition = randomSquareEnemy.id;
    state.values.currentPosition = randomNumber;
}
function moveEnemy() {
    if (!state.actions.timerId) {
        state.actions.timerId = setInterval(
            randomSquare,
            state.values.gameVelocity
        );
    }
}

function hitFeedBack(square) {
    setTimeout(randomSquare, 300);
    state.actions.timerId = restartInterval(state.actions.timerId, randomSquare, state.values.gameVelocity);
    square.style.backgroundColor = "#FF000066";
    setTimeout(() => { square.style.backgroundColor = "#1aeaa5"}, 200);
}
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (
                square.id === state.values.hitPosition &&
                !(state.values.currentTime <= 0)
            ) {
                playSound("hit");
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                hitFeedBack(square);
            }
        });
    });
}

function initialize() {
    randomSquare();
    moveEnemy();
    addListenerHitBox();
}

initialize();
