import React from "react";
import "../App.css";

const GameScreen = () => {
  const [player, setPlayer] = React.useState("X");
  const [gameState, setGameState] = React.useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [winner, setWinner] = React.useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleClick(index) {
    if (gameState[index] === "" && !winner) {
      const newGameState = [...gameState];
      newGameState[index] = player;
      setGameState(newGameState);

      checkWinner(newGameState);

      setPlayer(player === "X" ? "O" : "X");
    }
  }

  function checkWinner(currentGameState) {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentGameState[a] &&
        currentGameState[a] === currentGameState[b] &&
        currentGameState[a] === currentGameState[c]
      ) {
        setWinner(currentGameState[a]);
        return;
      }
    }

    if (!currentGameState.includes("")) {
      setWinner("Draw");
    }
  }

  function resetGame() {
    setGameState(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
    setWinner(null);
  }

  return (
    <div className="grid">
      <h2>
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `Player ${winner === "X" ? "1" : "2"} Wins!`
          : `Player ${player === "X" ? "1" : "2"}'s turn`}
      </h2>
      <div className="box">
        <div className="first-row">
          <button onClick={() => handleClick(0)} className="eachBlock">
            {gameState[0]}
          </button>
          <button onClick={() => handleClick(1)} className="eachBlock">
            {gameState[1]}
          </button>
          <button onClick={() => handleClick(2)} className="eachBlock">
            {gameState[2]}
          </button>
        </div>
        <div className="second-row">
          <button onClick={() => handleClick(3)} className="eachBlock">
            {gameState[3]}
          </button>
          <button onClick={() => handleClick(4)} className="eachBlock">
            {gameState[4]}
          </button>
          <button onClick={() => handleClick(5)} className="eachBlock">
            {gameState[5]}
          </button>
        </div>
        <div className="third-row">
          <button onClick={() => handleClick(6)} className="eachBlock">
            {gameState[6]}
          </button>
          <button onClick={() => handleClick(7)} className="eachBlock">
            {gameState[7]}
          </button>
          <button onClick={() => handleClick(8)} className="eachBlock">
            {gameState[8]} 
          </button>
        </div>
      </div>
      {winner && (
        <button onClick={resetGame} className="resetButton">
          Play Again
        </button>
      )}
    </div>
  );
};

export default GameScreen;
