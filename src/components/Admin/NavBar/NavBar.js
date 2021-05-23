import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../../../api/auth";
import "./NavBar.scss";

const close = () => {
  window.location.reload();
  logout();
};

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>App reportes</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Button className="btn btn-dark">
            <Link to="/admin/report-employee">Ver reporte de gastos</Link>
          </Button>
          <Button className="btn btn-dark">
            <Link to="/admin/add-employee">Agregar empleado</Link>
          </Button>
          <Button className="btn btn-dark">
            <Link to="/admin/list-employees">Lista de empleados</Link>
          </Button>
        </Nav>
        <Nav>
          <Nav.Item>
            <Button
              className="btn btn-dark"
              onClick={() => {
                close();
              }}
            >
              Cerrar sesión
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
