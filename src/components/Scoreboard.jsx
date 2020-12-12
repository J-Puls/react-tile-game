import React, { useContext } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { GameState } from "./GameState";

const Scoreboard = () => {
  const GS = useContext(GameState);
  const p1 = {
    score: GS.p1Score,
    bg: GS.p1Score <= GS.p2Score ? "danger" : "success",
  };
  const p2 = {
    score: GS.p2Score,
    bg: GS.p1Score >= GS.p2Score ? "danger" : "success",
  };

  return (
    <Container className="mt-2 text-light text-center">
      <Row className="mx-0 scoreboard">
        <Col xs="12" className="px-0">
          <Nav
            justify
            variant="pills"
            defaultActiveKey={"easy"}
            className="pb-1"
          >
            <Nav.Item>
              <Nav.Link
                eventKey="easy"
                value="1"
                onClick={GS.changeMode}
                className="easy"
              >
                Easy
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="med"
                value="2"
                onClick={GS.changeMode}
                className="med"
              >
                Medium
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="hard"
                value="3"
                onClick={GS.changeMode}
                className="hard"
              >
                Hard
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs="6" className={`bg-${p1.bg}`}>
          <Row>
            <Col xs="12">
              <p className="h5 mb-0">PLAYER</p>
            </Col>
            <Col xs="12">
              <p className="h2">{p1.score}</p>
            </Col>
          </Row>
        </Col>
        <Col xs="6" className={`bg-${p2.bg}`}>
          <Row>
            <Col xs="12">
              <p className="h5 mb-0">CPU</p>
            </Col>
            <Col xs="12">
              <p className="h2">{p2.score}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Scoreboard;
