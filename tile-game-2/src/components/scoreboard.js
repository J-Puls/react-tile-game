import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Scoreboard = props => {
  const p1Score = props.p1Score,
    p2Score = props.p2Score;

  let p1Bg = "bg-secondary",
    p2Bg = "bg-secondary";

  if (p1Score > p2Score && p1Score !== p2Score) {
    p1Bg = "bg-success";
  } else if (p1Score < p2Score && p1Score !== p2Score) {
    p2Bg = "bg-success";
  }
  let player;
  props.playerTurn === 1 ? (player = "Player") : (player = "CPU");

  return (
    <Row className="mx-0 text-center scoreboard">
      <Col xs="4" className={p1Bg}>
        <Row>
          <Col xs="12">
            <p className="h4">P1:</p>
          </Col>
          <Col xs="12">
            <p className="h2">{p1Score}</p>
          </Col>
        </Row>
      </Col>
      <Col xs="4">
        <p className="h4 pt-4">{player}</p>
      </Col>
      <Col xs="4" className={p2Bg}>
        <Row>
          <Col xs="12">
            <p className="h4">P2:</p>
          </Col>
          <Col xs="12">
            <p className="h2">{p2Score}</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Scoreboard;
