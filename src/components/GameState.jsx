/* React */
import React from "react";

export const GameState = React.createContext();

export const GameStateProvider = GameState.Provider;
export const GameStateConsumer = GameState.Consumer;
export default GameState;
