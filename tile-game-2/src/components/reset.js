import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Reset = props => {
  let message;
  props.winner === 0
    ? (message = "It's a Tie!")
    : (message = "Player " + props.winner + " Wins!");

  return (
    <Container className="reset">
      <Row className="flex-column">
        <Col>
          <p className="display-4 text-center">{message}</p>
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
export default Reset;
