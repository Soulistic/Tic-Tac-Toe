const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const ResetGameBtn = document.querySelector(".resetBtn");
let currPlayer;
let gameGrid;
let playerMoves;

const winningPos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function initGame() {
    currPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    playerMoves = { X: [], O: [] };
    
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });
    
    ResetGameBtn.classList.remove("active");
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}
initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

function handleClick(index) {
    if (gameGrid[index] === "") {
        if (playerMoves[currPlayer].length === 3) {
            let removedIndex = playerMoves[currPlayer].shift();
            gameGrid[removedIndex] = "";
            boxes[removedIndex].innerText = "";
        }
        
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        playerMoves[currPlayer].push(index);
        boxes[index].style.pointerEvents = "none";
        
        checkGameStatus();
        swapTurn();
    }
}

function swapTurn() {
    currPlayer = currPlayer === "X" ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currPlayer}`;
    boxes.forEach((box, index) => {
        if (gameGrid[index] === "") {
            box.style.pointerEvents = "all";
        }
    });
}

function checkGameStatus() {
    let winner = "";
    
    winningPos.forEach((position) => {
        if (
            gameGrid[position[0]] !== "" &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[1]] === gameGrid[position[2]]
        ) {
            winner = gameGrid[position[0]];
            
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    
    if (winner !== "") {
        gameInfo.innerText = `Winner - ${winner}`;
        ResetGameBtn.classList.remove("active");
        newGameBtn.classList.add("active");
        return;
    }
}

newGameBtn.addEventListener("click", initGame);
ResetGameBtn.addEventListener("click", initGame);
