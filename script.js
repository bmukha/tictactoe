const PlayerFactory = (name, sign) => {
  return {
    name,
    sign,
  };
};

const gameboard = (() => {
  const startBtn = document.querySelector("#start");
  startBtn.addEventListener("click", () => game.start());
  const resetBtn = document.querySelector("#reset");
  resetBtn.addEventListener("click", () => game.reset());

  const playersSigns = () => {
    const selection = document.getElementsByName("sign");
    if (selection[0].checked) {
      return {
        p1: "X",
        p2: "O",
      };
    }
    return {
      p1: "O",
      p2: "X",
    };
  };

  const player1Name = () => document.querySelector("#p1name").value;
  const player2Name = () => document.querySelector("#p2name").value;

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
    playersSigns,
    player1Name,
    player2Name,
  };
})();

const game = (() => {
  const board = document.querySelector("#board");

  const initPlayers = () => {
    const player1 = PlayerFactory(
      gameboard.player1Name(),
      gameboard.playersSigns().p1
    );
    const player2 = PlayerFactory(
      gameboard.player2Name(),
      gameboard.playersSigns().p2
    );
    return {
      player1,
      player2,
    };
  };

  const start = () => {
    if (gameboard.player1Name() === "" || gameboard.player2Name() === "") {
      alert("Fill Player1 and Player2 names first!");
      return;
    }
    board.addEventListener("click", play);
    // gameboard.render();
  };

  let activePlayer;

  const play = (e) => {
    const players = initPlayers();

    if (e.target.id[0] === "f" && !e.target.innerHTML) {
      if (activePlayer === undefined) {
        activePlayer = players.player1;
      }
      gameboard.gameState[e.target.id.slice(1) - 1] = activePlayer.sign;
      gameboard.render();

      setTimeout(() => {
        if (checkWinCondition()) {
          alert(`Game Over! ${activePlayer.name} won!`);
          game.reset();
          return;
        } else if (!gameboard.gameState.includes(NaN)) {
          alert(`It's a draw!`);
          game.reset();
          return;
        }
      }, 10);
      if (activePlayer.name === players.player1.name) {
        activePlayer = players.player2;
      } else {
        activePlayer = players.player1;
      }
    }
  };

  const reset = () => {
    game.playerCount = 0;
    gameboard.gameState.fill(NaN);
    log.innerHTML = "";
    gameboard.render();
    activePlayer = undefined;
  };

  const checkWinCondition = () => {
    if (
      (gameboard.gameState[0] === gameboard.gameState[1] &&
        gameboard.gameState[0] === gameboard.gameState[2]) ||
      (gameboard.gameState[3] === gameboard.gameState[4] &&
        gameboard.gameState[3] === gameboard.gameState[5]) ||
      (gameboard.gameState[6] === gameboard.gameState[7] &&
        gameboard.gameState[6] === gameboard.gameState[8]) ||
      (gameboard.gameState[0] === gameboard.gameState[3] &&
        gameboard.gameState[0] === gameboard.gameState[6]) ||
      (gameboard.gameState[1] === gameboard.gameState[4] &&
        gameboard.gameState[1] === gameboard.gameState[7]) ||
      (gameboard.gameState[2] === gameboard.gameState[5] &&
        gameboard.gameState[2] === gameboard.gameState[8]) ||
      (gameboard.gameState[0] === gameboard.gameState[4] &&
        gameboard.gameState[0] === gameboard.gameState[8]) ||
      (gameboard.gameState[2] === gameboard.gameState[4] &&
        gameboard.gameState[2] === gameboard.gameState[6])
    ) {
      return true;
    }
    return false;
  };

  return {
    start,
    reset,
  };
})();
