import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TabPanel from "../components/Home/TabPanel/TabPanel";
import { Redirect } from "react-router";
import { getAccessTokenApi } from "../api/auth";

export default function Home() {
  if (getAccessTokenApi()) {
    return <Redirect to="/admin" />;
  }

  return (
    <Container>
      <Row className="py-5 mt-30 align-items-center">
        <Col md={5}>
          <h1>¡Bienvenido(a)</h1>
          <p className="font-italic text-muted mb-0">
            Inicie sesión o cree una cuenta para acceder.
          </p>
        </Col>
        <Col md={7}>
          <TabPanel />
        </Col>
      </Row>
    </Container>
  );
}
