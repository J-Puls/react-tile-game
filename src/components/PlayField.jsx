import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import { Square } from "./Square";
import { GameState } from "./GameState";

const PlayField = (props) => {
  const GS = useContext(GameState);
  const currentSquares = Array.from(GS.squares);
  const renderSquares = [];

  for (const s of currentSquares) {
    renderSquares.push(
      <Square
        key={s.id}
        handleClick={props.handleClick}
        number={s.value}
        index={s.id}
        active={s.active}
      />
    );
  }

  return (
    <div className="playfield mx-auto pt-2 mt-2">
      <Row className="mx-0">
        {renderSquares.map((square) => {
          return square;
        })}
      </Row>
    </div>
  );
};

export default PlayField;
