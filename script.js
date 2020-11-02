const gameBoard = (() => {
  const startBtn = document.querySelector("#start");
  startBtn.addEventListener("click", () => gameFlow.start());
  const resetBtn = document.querySelector("#reset");
  resetBtn.addEventListener("click", () => gameFlow.reset());

  const gameState = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];

  const render = () => {
    gameState.forEach((item, i) => {
      let field = document.querySelector(`#board > #f${i + 1}`);
      field.innerHTML = "";
      if (item) {
        field.innerHTML = item;
      }
    });
  };

  return {
    gameState,
    render,
  };
})();

const PlayerFactory = () => {
  let name = prompt("Enter your name");
  return {
    name,
  };
};

const gameFlow = (() => {
  let gameState = "start";
  let playerSign = "X";
  const start = () => {
    let board = document.querySelector("#board");
    board.addEventListener("click", (e) => {
      if (e.target.id[0] === "f" && !e.target.innerHTML) {
        gameBoard.gameState[e.target.id.slice(1) - 1] = gameFlow.changeSign();
        console.log(e.target.id.slice(1));
        console.log(gameBoard.gameState);
        console.log(checkWinCondition());
        gameBoard.render();
        setTimeout(() => {
          if (checkWinCondition()) {
            alert("Game Over!");
            gameFlow.reset();
          }
        }, 10);
      }
    });
    gameBoard.render();
  };
  const reset = () => {
    gameBoard.gameState.fill(NaN);
    console.log(gameBoard.gameState);
    gameBoard.render();
  };
  const changeSign = () =>
    playerSign === "X" ? (playerSign = "O") : (playerSign = "X");

  const checkWinCondition = () => {
    if (
      (gameBoard.gameState[0] === gameBoard.gameState[1] &&
        gameBoard.gameState[0] === gameBoard.gameState[2]) ||
      (gameBoard.gameState[3] === gameBoard.gameState[4] &&
        gameBoard.gameState[3] === gameBoard.gameState[5]) ||
      (gameBoard.gameState[6] === gameBoard.gameState[7] &&
        gameBoard.gameState[6] === gameBoard.gameState[8]) ||
      (gameBoard.gameState[0] === gameBoard.gameState[3] &&
        gameBoard.gameState[0] === gameBoard.gameState[6]) ||
      (gameBoard.gameState[1] === gameBoard.gameState[4] &&
        gameBoard.gameState[1] === gameBoard.gameState[7]) ||
      (gameBoard.gameState[2] === gameBoard.gameState[5] &&
        gameBoard.gameState[2] === gameBoard.gameState[8]) ||
      (gameBoard.gameState[0] === gameBoard.gameState[4] &&
        gameBoard.gameState[0] === gameBoard.gameState[8]) ||
      (gameBoard.gameState[2] === gameBoard.gameState[4] &&
        gameBoard.gameState[2] === gameBoard.gameState[6])
    ) {
      return true;
    }
    return false;
  };

  return {
    gameState,
    start,
    reset,
    changeSign,
    checkWinCondition,
  };
})();
