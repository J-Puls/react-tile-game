import React from "react";
import Col from "react-bootstrap/Col";

export const ActiveSquare = props => {
  return (
    <Col
      xs="2"
      className={"shadow bg-primary square rounded border"}
      onClick={props.handleClick}
      index={props.index}
    >
      <p className="text-center lead mt-2" index={props.index}>
        {props.number}
      </p>
    </Col>
  );
};

export const InactiveSquare = props => {
  return (
    <Col
      xs="2"
      className={"shadow bg-dark square rounded border selected"}
      index={props.index}
    >
      <p className="text-center text-light lead mt-2" index={props.index}>
        X
      </p>
    </Col>
  );
};
