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
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        alert("Game over! O seu resultado foi: " + state.values.result);
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
    }
}

function playSound(audioName) {
    let audio = new Audio(`../../assets/audio/${audioName}.m4a`);
    audio.play();
}
function randomSquare() {
    state.view.squares.forEach((square) => {
        if (square.classList.contains("enemy")) {
            square.classList.remove("enemy");
        }
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquareEnemy = state.view.squares[randomNumber];
        randomSquareEnemy.classList.toggle("enemy");
        state.values.hitPosition = randomSquareEnemy.id;
}
function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function initialize() {
    // moveEnemy();
    addListenerHitBox();
}

initialize();
