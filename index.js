const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");
const ResetGameBtn=document.querySelector(".resetBtn");
let currPlayer;
let gameGrid;
const winningPos=[
    [0,1,2], // row 1
    [3,4,5],
    [6,7,8],
    [0,3,6], // column 1
    [1,4,7],
    [2,5,8],
    [0,4,8],// diagonal top left to bottom right
    [2,4,6]
];
function initGame(){
    currPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player-${currPlayer}`;
}
initGame();

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents="none"
        swapTurn();
        checkGameStatus();
    }
}

function swapTurn(){
    if(currPlayer ==='X'){
        currPlayer = 'O';
    }
    else{
        currPlayer = 'X';
    }
    gameInfo.innerText = `Current Player-${currPlayer}`;
}

function checkGameStatus() {
    let answer = "";

    winningPos.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    
                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });
    if(answer !== ""){
        gameInfo.innerText=`Winner Player-${answer}`
        ResetGameBtn.classList.remove("active");
        newGameBtn.classList.add("active");
        return;
    }
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillCount++;
    });
    if(fillCount ===1){
        ResetGameBtn.classList.add("active");
    }

    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}
newGameBtn.addEventListener('click', initGame);
ResetGameBtn.addEventListener('click',initGame);