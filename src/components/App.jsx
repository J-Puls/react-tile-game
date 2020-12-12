import React, { useState, useEffect } from "react";
import PlayField from "./PlayField";
import Scoreboard from "./Scoreboard";
import GameOver from "./GameOver";
import * as utils from "../utils";
import { GameStateProvider } from "./GameState";

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
  useEffect(() => {
    utils.init(setAvailableIndexes, setAvailableSquares, setSquares, mode);
  }, [mode]);

  // CPU opponent logic. Waits 300ms before making move to simulate "thinking"
  useEffect(() => {
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
  }, [playerTurn, availableIndexes, availableSquares, mode, p2Score, squares]);

  // Update winner after a turn is completed
  useEffect(() => {
    const winner = p1Score > p2Score ? 1 : p2Score > p1Score ? 2 : 0;
    setWinner(winner);
  }, [p1Score, p2Score]);

  // Necessary to use current game mode
  useEffect(() => {
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

    reset && resetGame();
  }, [reset, mode]);

  const handleClick = (e) => {
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
  const changeMode = (e) => {
    utils.changeMode(e, mode, setMode);
    setReset(true);
  };

  const gameState = {
    availableIndexes,
    availableSquares,
    changeMode: (e) => changeMode(e),
    mode,
    p1Score,
    p2Score,
    playerTurn,
    reset,
    setReset: () => setReset(true),
    setAvailableIndexes,
    setAvailableSquares,
    setP1Score,
    setP2Score,
    setPlayerTurn,
    squares,
    winner,
  };

  // Render PlayField if there are available blocks, else render game over screen
  return (
    <GameStateProvider value={gameState}>
      <Scoreboard />
      {availableSquares.size > 0 ? (
        <PlayField handleClick={(e) => handleClick(e)} />
      ) : (
        <GameOver winner={winner} />
      )}
    </GameStateProvider>
  );
};

export default App;
