import React, { useState, useEffect } from "react";
import Playfield from "./playfield";
import Scoreboard from "./scoreboard";
import Reset from "./reset";
import * as utils from "../utils";

const App = () => {
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [availableSquares, setAvailableSquares] = useState(new Set([]));
  const [availableIndexes, setAvailableIndexes] = useState([]);
  const [squares, setSquares] = useState(new Set([]));
  const [winner, setWinner] = useState(null);

  // Randomize block values after first render
  useEffect(
    () => utils.init(setAvailableIndexes, setAvailableSquares, setSquares),
    []
  );

  // CPU opponent logic. Waits 300ms before making move to simulate "thinking"
  useEffect(() => {
    setTimeout(() => {
      if (playerTurn === 2) {
        const cpuIndex = utils.pickRandomIndex(availableIndexes);
        const cpuSquareId = availableIndexes[cpuIndex];
        const newSquares = new Set(squares);
        const newAvailableSquares = new Set(availableSquares);
        const foundItem = utils.findItem(availableSquares, cpuSquareId);
        const newIndexes = utils.consumeIndex(availableIndexes, cpuSquareId);

        setAvailableIndexes(newIndexes);
        newAvailableSquares.delete(foundItem);
        setAvailableSquares(newAvailableSquares);
        utils.consumeSquare(newSquares, foundItem, setP2Score, p2Score);
        setSquares(newSquares);
        setPlayerTurn(1);
      }
    }, 300);
  }, [playerTurn]);

  // Update winner after a turn is completed
  useEffect(() => utils.getWinner(p1Score, p2Score, setWinner), [
    availableSquares
  ]);

  // Resets everything to initial state and randomizes blocks
  const reset = () => {
    const indexes = utils.generateIndexes();
    setAvailableIndexes(indexes);
    setP1Score(0);
    setP2Score(0);
    setPlayerTurn(1);
    setAvailableSquares(60);
    const newSquares = utils.generateSquares();
    setSquares(newSquares);
    setAvailableSquares(newSquares);
    setWinner(null);
    console.log("Game reset.");
  };

  const handleClick = e => {
    utils.handleClick(
      e,
      availableSquares,
      squares,
      setAvailableSquares,
      playerTurn,
      availableIndexes,
      setAvailableIndexes,
      setP1Score,
      p1Score,
      setPlayerTurn
    );
  };

  // Render playfield if there are available blocks
  // Render game over screen if no available blocks
  if (availableSquares.size > 0) {
    return (
      <div className="p-0">
        <Scoreboard
          p1Score={p1Score}
          p2Score={p2Score}
          playerTurn={playerTurn}
        />
        <Playfield
          squares={squares}
          playerTurn={playerTurn}
          handleClick={e => handleClick(e)}
        />
      </div>
    );
  } else {
    return (
      <div className="p-0">
        <Scoreboard
          p1Score={p1Score}
          p2Score={p2Score}
          playerTurn={playerTurn}
        />
        <Reset handleClick={() => reset()} winner={winner} />
      </div>
    );
  }
};

export default App;
