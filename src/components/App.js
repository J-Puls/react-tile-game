import React, { useState, useEffect } from "react";
import Playfield from "./playfield";
import Scoreboard from "./scoreboard";
import GameOver from "./gameover";
import * as utils from "../utils";

const App = () => {
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [availableSquares, setAvailableSquares] = useState(new Set([]));
  const [availableIndexes, setAvailableIndexes] = useState([]);
  const [squares, setSquares] = useState(new Set([]));
  const [winner, setWinner] = useState(null);
  const [mode, setMode] = useState(1);
  const [reset, setReset] = useState(false);

  // Randomize block values after first render
  useEffect(
    () =>
      utils.init(setAvailableIndexes, setAvailableSquares, setSquares, mode),
    []
  );

  // CPU opponent logic. Waits 300ms before making move to simulate "thinking"
  useEffect(() => {
    setTimeout(() => {
      if (playerTurn === 2) {
        let cpuSquareId;
        switch (mode) {
          case 1:
            cpuSquareId = utils.easyModeSelection(availableIndexes);
            break;
          case 2:
            cpuSquareId = utils.medModeSelection(availableSquares);
            break;
          case 3:
            cpuSquareId = utils.hardModeSelection(availableSquares);
            break;
          default:
            break;
        }

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
  useEffect(() => {
    if (p1Score > p2Score) setWinner(1);
    else if (p2Score > p1Score) setWinner(2);
    else setWinner(0);
  });

  // Resets everything to initial state and randomizes blocks
  const resetGame = () => {
    const indexes = utils.generateIndexes();
    setAvailableIndexes(indexes);
    setP1Score(0);
    setP2Score(0);
    setPlayerTurn(1);
    setAvailableSquares(60);
    const newSquares = utils.generateSquares(mode);
    setSquares(newSquares);
    setAvailableSquares(newSquares);
    setWinner(null);
    console.log("Game reset.");
    setReset(false);
  };

  // Necessary to use current game mode
  useEffect(() => {
    switch (reset) {
      case true:
        resetGame();
        break;
      case false:
        break;
    }
  }, [reset]);

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
  const changeMode = e => {
    utils.changeMode(e, mode, setMode);
    setReset(true);
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
          mode={mode}
          changeMode={e => changeMode(e)}
        />{" "}
        <Playfield
          squares={squares}
          playerTurn={playerTurn}
          handleClick={e => handleClick(e)}
        />{" "}
      </div>
    );
  } else {
    return (
      <div className="p-0">
        <Scoreboard
          p1Score={p1Score}
          p2Score={p2Score}
          playerTurn={playerTurn}
        />{" "}
        <GameOver handleClick={() => setReset(true)} winner={winner} />{" "}
      </div>
    );
  }
};

export default App;
