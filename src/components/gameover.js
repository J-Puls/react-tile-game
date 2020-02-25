import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
      return null;
  }

  return (
    <Container className="vh-50 w-100 mt-5">
      <Row className="mx-0">
        <Col xs="12" className="text-center mt-5">
          <p className="display-4 text-light">{message}</p>
          <Button
            variant="primary"
            size="lg"
            className="mx-auto"
            onClick={props.handleClick}
          >
            Play Again?
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default GameOver;
