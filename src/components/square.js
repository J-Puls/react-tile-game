import React from "react";
import Col from "react-bootstrap/Col";

const squareStyle = {
  background: "#fafafa",
  transitionDuration: "0.2s",
  height: "3em",
  border: "2px solid #101010",
  textAlign: "center",
  paddingLeft: "0 !important",
  paddingRight: "0 !important"
};
const inactiveSquareStyle = { ...squareStyle };
inactiveSquareStyle.background = "transparent";

export const ActiveSquare = props => {
  return (
    <Col
      xs="2"
      className={"shadow square rounded "}
      style={squareStyle}
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
      className={"square selected"}
      style={inactiveSquareStyle}
      index={props.index}
    ></Col>
  );
};
