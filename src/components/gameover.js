import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const GameOver = props => {
  let message;

  switch (props.winner) {
    case 0:
      message = "It's a Tie!";
      break;
    case 1:
      message = "You Win!";
      break;
    case 2:
      message = message = "CPU Wins!";
      break;
    default:
      break;
  }

  return (
    <Container className="reset">
      <Row className="flex-column">
        <Col>
          <p className="display-4 text-center text-light">{message}</p>
        </Col>
        <Col
          xs="4"
          className="btn btn-primary mx-auto"
          onClick={props.handleClick}
        >
          Play Again?
        </Col>
      </Row>
    </Container>
  );
};
export default GameOver;
