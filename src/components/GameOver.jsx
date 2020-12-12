import React, { useContext } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { GameState } from "./GameState";

const GameOver = () => {
  const GS = useContext(GameState);
  const message =
    GS.winner === 0
      ? "It's a Tie!"
      : GS.winner === 1
      ? "You Win!"
      : "CPU Wins!";

  return (
    <Container className="vh-50 w-100 mt-5">
      <Row className="mx-0">
        <Col xs="12" className="text-center mt-5">
          <p className="display-4 text-light">{message}</p>
          <Button
            variant="primary"
            size="lg"
            className="mx-auto"
            onClick={GS.setReset}
          >
            Play Again?
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default GameOver;
