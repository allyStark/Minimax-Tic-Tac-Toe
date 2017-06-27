var canPlay = [];
var gameStart = false;
var compIs = "";
var playerIs = "";
var count = 0;

$("#X,#O").on("click", function() {

  gameStart = true;
  clearBoard();

  if (this.id === "O") {


      
      $(".col-4").addClass("flipInY");  
      
 
    
    makeMove(0);
    compIs = "X";
    playerIs = "O";

  } else {

    compIs = "O";
    playerIs = "X";

  }

});

$(".col-4").on("click", function() {

  if (canPlay[this.id] === 0 && gameStart === true) {
    
    firstGame = false;
    
    makeMove(this.id);

    var id = compMove(canPlay);
    
    gameStart = false;
    
    setTimeout(function (){
      
      makeMove(id);
      gameStart=true;
    
    }, 2000);

  }

});

function checkScore(gameGrid) {

  //check if there is a winner 
  if (gameGrid[0] === compIs && gameGrid[1] === compIs && gameGrid[2] === compIs ||
    gameGrid[3] === compIs && gameGrid[4] === compIs && gameGrid[5] === compIs ||
    gameGrid[6] === compIs && gameGrid[7] === compIs && gameGrid[8] === compIs ||
    gameGrid[0] === compIs && gameGrid[3] === compIs && gameGrid[6] === compIs ||
    gameGrid[1] === compIs && gameGrid[4] === compIs && gameGrid[7] === compIs ||
    gameGrid[2] === compIs && gameGrid[5] === compIs && gameGrid[8] === compIs ||
    gameGrid[0] === compIs && gameGrid[4] === compIs && gameGrid[8] === compIs ||
    gameGrid[2] === compIs && gameGrid[4] === compIs && gameGrid[6] === compIs) {

    return 1;

  } else if (gameGrid[0] === playerIs && gameGrid[1] === playerIs && gameGrid[2] === playerIs ||
    gameGrid[3] === playerIs && gameGrid[4] === playerIs && gameGrid[5] === playerIs ||
    gameGrid[6] === playerIs && gameGrid[7] === playerIs && gameGrid[8] === playerIs ||
    gameGrid[0] === playerIs && gameGrid[3] === playerIs && gameGrid[6] === playerIs ||
    gameGrid[1] === playerIs && gameGrid[4] === playerIs && gameGrid[7] === playerIs ||
    gameGrid[2] === playerIs && gameGrid[5] === playerIs && gameGrid[8] === playerIs ||
    gameGrid[0] === playerIs && gameGrid[4] === playerIs && gameGrid[8] === playerIs ||
    gameGrid[2] === playerIs && gameGrid[4] === playerIs && gameGrid[6] === playerIs) {

    return -1;

    //if the game ties, return 0
  } else if (checkGrid(gameGrid)) {

    return 0;

  }

} //endkeepScore

function makeGrid(gameGrid, player, index) {
  //create a new grid using the old grid, the current players ID and the square index
  var newGrid = [...gameGrid];

  newGrid[index] = player;

  return newGrid;

}

function compMove(gameGrid) {

  //best value and move recommendation. First move is always the max player
  var bestVal = -1000;
  var move = 0;

  //loop through board squares
  for (var i = 0; i < gameGrid.length; i++) {
    //check if square is free
    if (gameGrid[i] === 0) {
      //return new grid with new square marked
      var newGrid = makeGrid(gameGrid, compIs, i);

      var moveVal = miniMax(newGrid, playerIs);
      //does the next square have a good outcome? If so, set the value to the best value
      if (bestVal < moveVal) {

        bestVal = moveVal;
        //this square index has the best outcome
        move = i;

      }

    }

  }

  return move;

} //end compMove

function miniMax(gameGrid, turn) {

  var bestVal;
  //check if this state is terminal
  var leafState = checkScore(gameGrid);

  if (leafState !== undefined) {

    return leafState;

  } else {

    var nextTurn;
    //is it the maximising players turn?
    if (turn === compIs) {

      bestVal = -1000;
      nextTurn = playerIs;
      //minimising players turn?
    } else if (turn === playerIs) {

      bestVal = 1000;
      nextTurn = compIs;

    }
    //iterate through the board
    for (var i = 0; i < gameGrid.length; i++) {
      //square free?
      if (gameGrid[i] === 0) {
        //change the free square to the player
        var newGrid = makeGrid(gameGrid, turn, i);

        var moveVal = miniMax(newGrid, nextTurn);
        //return the best value
        if (moveVal > bestVal && turn === compIs || moveVal < bestVal && turn === playerIs) {

          bestVal = moveVal;

        }

      }

    }

  }

  return bestVal;

} //end miniMax

function makeMove(id) {

  count++;
  //is the game over? If so, stop the function
  if (count > 9) {

    return;

  }

  if (count % 2 !== 0) {

    var HTMLVal = "X";

  } else {

    var HTMLVal = "O";

  }
  //update main game array and game board
  canPlay[id] = HTMLVal;
  $("#" + id).removeClass("unflipped").addClass("flipInY flipped");
  document.getElementById(id).innerHTML = HTMLVal;
  var stateIs = checkScore(canPlay);
   
    if(stateIs){
    
    $(".finish").removeClass("fadeInDown").addClass("fadeInDown");
    
  }
  
  //last move? If so, display a message
  if (stateIs === 0) {

    document.getElementById("finished").innerHTML = "DRAW!!! </br></br>Choose X or O to play again";
    gameStart = false;

  } else if (stateIs === 1) {

    document.getElementById("finished").innerHTML = compIs + " WINS!!! </br></br>Choose X or O to play again";
    gameStart = false;

  } else if (stateIs === -1) {

    document.getElementById("finished").innerHTML = playerIs + " WINS!!! </br></br>Choose X or O to play again";
    gameStart = false;

  }

} //end makeMove

function clearBoard() {
  //reset the game
  document.getElementById("finished").innerHTML = "";
  canPlay = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  count = 0;
    
    $(".col-4").removeClass("flipInY flipped").addClass("flipInY unflipped");
    
    setTimeout(function(){
      
      $(".col-4").removeClass("flipInY");
      
    }, 700)
    
  for (i = 0; i < 9; i++) {

    document.getElementById(i).innerHTML = "";

  }

}

function checkGrid(grid) {
  //check the board for a tie. 
  for (var i = 0; i < grid.length; i++) {

    if (grid[i] === 0) {

      return false;

    }

  }

  return true;

}