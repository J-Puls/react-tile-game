import React from "react";
import Row from "react-bootstrap/Row";
import { ActiveSquare, InactiveSquare } from "./square";

const Playfield = props => {
  let squares = [];
  const currentSquares = Array.from(props.squares);
  for (let i = 0; i < props.squares.size; i++) {
    if (currentSquares[i].active === true) {
      squares.push(
        <ActiveSquare
          key={i}
          handleClick={props.handleClick}
          number={currentSquares[i].value}
          index={currentSquares[i].id}
        />
      );
    } else {
      squares.push(<InactiveSquare key={i} index={currentSquares[i].id} />);
    }
  }

  return (
    <div className="playfield mx-auto pt-2 mt-2">
      <Row className="mx-0">
        {squares.map(square => {
          return square;
        })}
      </Row>
    </div>
  );
};

export default Playfield;
