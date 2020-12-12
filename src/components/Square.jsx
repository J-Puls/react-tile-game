import React from "react";
import { Col } from "react-bootstrap";

export const Square = (props) => {
  return (
    <Col
      xs="2"
      className={`square rounded ${props.active && "active shadow"}`}
      onClick={props.active ? props.handleClick : undefined}
      index={props.index}
    >
      {props.active && (
        <p className="text-center lead mt-2" index={props.index}>
          {props.number}
        </p>
      )}
    </Col>
  );
};
