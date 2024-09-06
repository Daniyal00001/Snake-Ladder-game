let img = document.querySelector(".img");
let whosTurn = document.querySelector(".whosTurn");
let player1turn = false;
let number = document.querySelector(".number");
let player1score = 0;
let player2score = 0;
let move1 = document.querySelector(".move1");
let move2 = document.querySelector(".move2");
let container = document.querySelector(".container")
let winner = document.querySelector(".winner");
let button = document.querySelector(".button");
let innertext = document.querySelector(".innertext")
let allimages = [
    "face1.JPEG",
    "face2.png",
    "face3.png",
    "face4.JPEG",
    "face5.JPEG",
    "face6.png"
];

img.addEventListener("click",()=>{
    const sound = new Audio("dice-95077.mp3");
    roledice();     //1
    sound.play();   //2
   
});


let roledice =()=>{
    img.classList.remove("rotate");
    void img.offsetWidth; 
    img.classList.add("rotate")  ;
    setTimeout(changeface, 500);       // 3  -----for complete animation
}

let changeface = () => {
  const randomIndex = Math.floor(Math.random() * allimages.length);
  img.src = allimages[randomIndex];
  changenumber(randomIndex);  // Show the number before moving
  moving(randomIndex);  // Move the player piece
  setTimeout(changeturn, 600);  // Flip the turn after moving
};



let changeturn = () => {
  if (player1turn) {
      whosTurn.innerText = "Player 1 Turn";
  } else {
      whosTurn.innerText = "Player 2 Turn";
  }
  player1turn = !player1turn;  // flip turn at the end
};

let changenumber = (randomIndex)=>{
  if(randomIndex == 0){
    number.innerText ="1";
  }
  else if (randomIndex==1){
    number.innerText="2";
  }
  else if (randomIndex==2){
    number.innerText="3";
  }
  else if (randomIndex==3){
    number.innerText="4";
  }
  else if (randomIndex==4){
    number.innerText="5";
  }
  else if (randomIndex==5){
    number.innerText="6";
  }
}

let moving = (randomIndex) => {
  let scoreIncrement = randomIndex + 1; // Dice roll value (1 to 6)

  if (!player1turn) {  // Player 1's move
    if (player1score + scoreIncrement <= 100) {
      player1score += scoreIncrement;
      setTimeout(() => moveToGridPosition(move1, player1score), 500);
    }
  } else {  // Player 2's move
    if (player2score + scoreIncrement <= 100) {
      player2score += scoreIncrement;
      setTimeout(() => moveToGridPosition(move2, player2score), 500);
    }
  }
};


// let moveToGridPosition = (mover, score) => {
//   // if (score > 100) {return} ;

//   // Handle snakes and ladders
//   if (score == 1) score = 38;
//   if (score == 4) score = 14;
//   if (score == 8) score = 10;
//   if (score == 21) score = 42;
//   if (score == 28) score = 76;
//   if (score == 50) score = 67;
//   if (score == 71) score = 92;
//   if (score == 80) score = 99;
//   if (score == 32) score = 10;
//   if (score == 36) score = 6;
//   if (score == 48) score = 26;
//   if (score == 62) score = 18;
//   if (score == 88) score = 24;
//   if (score == 95) score = 56;
//   if (score == 97) score = 78;
//   if (!player1turn) {
//     player1score = score; // Update player1score globally
// } else {
//     player2score = score; // Update player2score globally
// }

//  if (score == 100) {
//   setTimeout(() => {
//     const sound2 = new Audio("winning.mp3");
//     sound2.play();
//     container.classList.add("hide");
//     winner.classList.remove("hide");
//     innertext.innerText = `Congratulations, the winner is Player ${player1turn ? 1 : 2}!`;
//   }, 1000); // 1-second delay before showing the winner
// }

//   console.log(`player1score is ${player1score}`);
//   console.log(`player2score is ${player2score}`);

//   // Calculate the row and column
//   let row = Math.floor((score - 1) / 10);
//   let column = (score - 1) % 10;

//   // Reverse column number for odd rows to handle the zigzag
//   if (row % 2 !== 0) {
//       column = 9 - column;
//   }

//   // Calculate top and left based on row and column
//   let top = (9 - row) * 50; // Adjust based on the grid size
//   let left = column * 50;

//   // Apply the top and left positions to move the piece smoothly
//   mover.style.top = `${top}px`;
//   mover.style.left = `${left}px`;
// };

// button.addEventListener("click", () => {
//   window.location.reload();
// });

let moveToGridPosition = (mover, score) => {
  // Get the current size of the board dynamically
  let board = document.querySelector(".board");
  let boardSize = board.offsetWidth; // Assuming the board is a square
  let gridSize = boardSize / 10; // Divide the board size by 10 to get each cell size

  // Handle snakes and ladders
  if (score == 1) score = 38;
  if (score == 4) score = 14;
  if (score == 8) score = 10;
  if (score == 21) score = 42;
  if (score == 28) score = 76;
  if (score == 50) score = 67;
  if (score == 71) score = 92;
  if (score == 80) score = 99;
  if (score == 32) score = 10;
  if (score == 36) score = 6;
  if (score == 48) score = 26;
  if (score == 62) score = 18;
  if (score == 88) score = 24;
  if (score == 95) score = 56;
  if (score == 97) score = 78;

  if (!player1turn) {
    player1score = score; // Update player1score globally
  } else {
    player2score = score; // Update player2score globally
  }

  // Check for winner
  if (score == 100) {
    setTimeout(() => {
      const sound2 = new Audio("winning.mp3");
      sound2.play();
      container.classList.add("hide");
      winner.classList.remove("hide");
      innertext.innerText = `Congratulations, the winner is Player ${player1turn ? 1 : 2}!`;
    }, 1000); // 1-second delay before showing the winner
  }

  // Calculate the row and column
  let row = Math.floor((score - 1) / 10);
  let column = (score - 1) % 10;

  // Reverse column number for odd rows to handle the zigzag
  if (row % 2 !== 0) {
    column = 9 - column;
  }

  // Calculate top and left based on row and column
  let top = (9 - row) * gridSize; // Adjust based on the dynamic grid size
  let left = column * gridSize;

  // Apply the top and left positions to move the piece smoothly
  mover.style.top = `${top}px`;
  mover.style.left = `${left}px`;
};
