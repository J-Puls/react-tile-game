import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Scoreboard = props => {
  const p1Score = props.p1Score,
    p2Score = props.p2Score;

  let p1Bg = "bg-danger",
    p2Bg = "bg-danger";

  if (p1Score > p2Score && p1Score !== p2Score) {
    p1Bg = "bg-success";
  } else if (p1Score < p2Score && p1Score !== p2Score) {
    p2Bg = "bg-success";
  }
  let player;
  props.playerTurn === 1 ? (player = "Player") : (player = "CPU");

  return (
    <Container>
      <Row className="mx-0 text-center scoreboard">
        <Col xs="12" className="px-0">
          <Nav fill variant="pills" defaultActiveKey={"easy"} className="pb-1">
            <Nav.Item>
              <Nav.Link
                eventKey="easy"
                value="1"
                onClick={props.changeMode}
                className="easy"
              >
                Easy
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="med"
                value="2"
                onClick={props.changeMode}
                className="med"
              >
                Medium
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="hard"
                value="3"
                onClick={props.changeMode}
                className="hard"
              >
                Hard
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs="4" className={p1Bg}>
          <Row>
            <Col xs="12">
              <p className="h5 mb-0">PLAYER</p>
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
              <p className="h5 mb-0">CPU</p>
            </Col>
            <Col xs="12">
              <p className="h2">{p2Score}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Scoreboard;
