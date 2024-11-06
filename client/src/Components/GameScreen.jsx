import React, { useEffect } from "react";
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

  const [play1, setPlay1] = React.useState(() => {
    return parseInt(localStorage.getItem("play1")) || 0;
  });
  const [play2, setPlay2] = React.useState(() => {
    return parseInt(localStorage.getItem("play2")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("play1", play1);
  }, [play1]);

  useEffect(() => {
    localStorage.setItem("play2", play2);
  }, [play2]);

  function handleClick(index) {
    if (gameState[index] === "" && !winner) {
      const newGameState = [...gameState];
      newGameState[index] = player;
      setGameState(newGameState);

      checkWinner(newGameState);

      setPlayer(player === "X" ? "O" : "X");

      if (player === "O") {
        let boxa = document.getElementById("player1-card");
        let boxb = document.getElementById("player2-card");
        boxa.style.backgroundColor = "#90EE90";
        boxb.style.backgroundColor = "white";
      } else {
        let boxa = document.getElementById("player1-card");
        let boxb = document.getElementById("player2-card");
        boxb.style.backgroundColor = "#90EE90";
        boxa.style.backgroundColor = "white";
      }
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
        changeColor(a, b, c);
        setWinner(currentGameState[a]);

        if (currentGameState[a] === "X") {
          setPlay1((prev) => prev + 1);
        } else {
          setPlay2((prev) => prev + 1);
        }
        return;
      }
    }

    if (!currentGameState.includes("")) {
      setWinner("Draw");
    }
  }

  function changeColor(a, b, c) {
    let buttonA = document.getElementById(a);
    let buttonB = document.getElementById(b);
    let buttonC = document.getElementById(c);
    let originalColorA = buttonA.style.backgroundColor;
    let originalColorB = buttonB.style.backgroundColor;
    let originalColorC = buttonC.style.backgroundColor;
    buttonA.style.backgroundColor = "#90EE90";
    buttonB.style.backgroundColor = "#90EE90";
    buttonC.style.backgroundColor = "#90EE90";

    setTimeout(function () {
      buttonA.style.backgroundColor = originalColorA;
      buttonB.style.backgroundColor = originalColorB;
      buttonC.style.backgroundColor = originalColorC;
    }, 500);
  }

  function resetGame() {
    setGameState(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
    setWinner(null);
    let boxa = document.getElementById("player1-card");
    let boxb = document.getElementById("player2-card");
    boxa.style.backgroundColor = "#90EE90";
    boxb.style.backgroundColor = "white";
  }

  return (
    <div className="Gamebox">
      <div id="player1-card" className="leftcard">
        <h3>Player 1</h3>
        <p>Wins: {play1}</p>
        <p>Losses: {play2}</p>
      </div>
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
            <button onClick={() => handleClick(0)} id="0" className="eachBlock">
              {gameState[0]}
            </button>
            <button onClick={() => handleClick(1)} id="1" className="eachBlock">
              {gameState[1]}
            </button>
            <button onClick={() => handleClick(2)} id="2" className="eachBlock">
              {gameState[2]}
            </button>
          </div>
          <div className="second-row">
            <button onClick={() => handleClick(3)} id="3" className="eachBlock">
              {gameState[3]}
            </button>
            <button onClick={() => handleClick(4)} id="4" className="eachBlock">
              {gameState[4]}
            </button>
            <button onClick={() => handleClick(5)} id="5" className="eachBlock">
              {gameState[5]}
            </button>
          </div>
          <div className="third-row">
            <button onClick={() => handleClick(6)} id="6" className="eachBlock">
              {gameState[6]}
            </button>
            <button onClick={() => handleClick(7)} id="7" className="eachBlock">
              {gameState[7]}
            </button>
            <button onClick={() => handleClick(8)} id="8" className="eachBlock">
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
      <div id="player2-card" className="rightcard">
        <h3>Player 2</h3>
        <p>Wins: {play2}</p>
        <p>Losses: {play1}</p>
      </div>
    </div>
  );
};

export default GameScreen;
