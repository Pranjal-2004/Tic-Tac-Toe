import React, { useState, useEffect } from "react";
import "../App.css";

const Multiplayer = () => {
  const [numPlayers, setNumPlayers] = useState(0);
  const [grid, setGrid] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState(null);
  const [wins, setWins] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const storedNumPlayers = Number(localStorage.getItem("numPlayers"));
    const storedWins = JSON.parse(localStorage.getItem("wins"));

    if (storedNumPlayers) {
      setNumPlayers(storedNumPlayers);
      setWins(storedWins || Array(storedNumPlayers).fill(0));
      generateGrid(storedNumPlayers); 
    }
  }, []);

  const handleInputChange = (e) => {
    const players = Number(e.target.value);
    setNumPlayers(players);

    const newWins = Array(players).fill(0);
    setWins(newWins);
    localStorage.setItem("numPlayers", players);
    localStorage.setItem("wins", JSON.stringify(newWins));
  };

  const generateGrid = (players) => {
    const gridSize = Math.ceil(Math.sqrt(players * 4));
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null));
    setGrid(newGrid);
    setCurrentPlayer(0);
    setWinner(null);
    setIsDraw(false);
  };

  const handleGenerateGrid = () => {
    generateGrid(numPlayers);
  };

  const handleClick = (rowIndex, colIndex) => {
    if (grid[rowIndex][colIndex] || winner || isDraw) return;

    const newGrid = grid.map((row) => row.slice());
    newGrid[rowIndex][colIndex] = symbols[currentPlayer];
    setGrid(newGrid);

    if (checkWinner(newGrid, rowIndex, colIndex)) {
      setWinner(symbols[currentPlayer]);

      const newWins = [...wins];
      newWins[currentPlayer] += 1;
      setWins(newWins);
      localStorage.setItem("wins", JSON.stringify(newWins)); 
    } else if (newGrid.every(row => row.every(cell => cell !== null))) {
      setIsDraw(true);
    } else {
      setCurrentPlayer((currentPlayer + 1) % numPlayers);
    }
  };

  const checkWinner = (grid, row, col) => {
    const symbol = symbols[currentPlayer];
    const inARow = grid.length;
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      for (let i = 1; i < inARow; i++) {
        const xForward = row + i * dx;
        const yForward = col + i * dy;

        if (
          xForward >= 0 &&
          xForward < grid.length &&
          yForward >= 0 &&
          yForward < grid.length &&
          grid[xForward][yForward] === symbol
        ) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i < inARow; i++) {
        const xBackward = row - i * dx;
        const yBackward = col - i * dy;

        if (
          xBackward >= 0 &&
          xBackward < grid.length &&
          yBackward >= 0 &&
          yBackward < grid.length &&
          grid[xBackward][yBackward] === symbol
        ) {
          count++;
        } else {
          break;
        }
      }
      if (count >= inARow) return true;
    }

    return false;
  };

  const handleReset = () => {
    generateGrid(numPlayers);
    setCurrentPlayer(0);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div>
      <label>Enter Number of Players:</label>
      <input
        type="number"
        placeholder="Number of players"
        value={numPlayers}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleGenerateGrid()}
      />

      <div className="grid2">
        {winner ? (
          <h2>Player {winner} Wins!</h2>
        ) : isDraw ? (
          <h2>It's a Draw!</h2>
        ) : (
          <h2>Player {symbols[currentPlayer]}'s turn</h2>
        )}
        <div className="Gamebox">
          <div className="first-container">
            {grid.length > 0 &&
              grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                  {row.map((cell, colIndex) => (
                    <button
                      className="eachBlock"
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleClick(rowIndex, colIndex)}
                      disabled={Boolean(cell) || winner || isDraw}
                    >
                      {cell}
                    </button>
                  ))}
                </div>
              ))}
          </div>
          <div className="second-container">
            {Array.from({ length: numPlayers }).map((_, index) => (
              <div
                key={index}
                className="multicard"
                style={{
                  backgroundColor: currentPlayer === index ? "#90EE90" : "transparent",
                }}
              >
                <p>Player {symbols[index]}:</p>
                <p>Wins: {wins[index]}</p>
              </div>
            ))}
          </div>
        </div>

        {(winner || isDraw) && (
          <button onClick={handleReset} className="resetButton">
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Multiplayer;
