import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { getAccessTokenApi } from "../../../api/auth";
import { getAllEmployeesApi } from "../../../api/employees";
import { ToastContainer } from "react-toastify";
import AddExpenseModal from "../AddExpenseModal/AddExpenseModal";
import "./ListEmployees.scss";
export default function ListEmployees() {
  const [employees, setEmployees] = useState([]);

  const token = getAccessTokenApi();

  useEffect(() => {
    getAllEmployeesApi(token).then(result => {
      setEmployees(result.employees);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="list-employees">
            <h4>Lista de empleados</h4>
            <List employees={employees} />
          </div>
        </Col>
      </Row>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

function List(props) {
  const [modalShow, setModalShow] = useState(false);
  const [id_user, setIdUser] = useState("");

  const { employees } = props;

  const openModal = user_id => {
    setIdUser(user_id);
    setModalShow(true);
  };

  if (!employees) {
    return <h4>No hay empleados para mostrar</h4>;
  }

  const redirect = id => {
    localStorage.setItem("employee_id", id);
    window.location.href = "/admin/report-employee";
  };

  return (
    <>
      <Table striped bordered hover variant="light" responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, i) => (
            <tr key={i}>
              <td>
                {employee.name} {employee.lastname}
              </td>
              <td>{employee.id}</td>
              <td className="text-center">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => redirect(employee.id)}
                >
                  Ver gastos
                </Button>
                <Button
                  className="mx-auto"
                  size="sm"
                  variant="success"
                  onClick={() => {
                    openModal(employee.id);
                  }}
                >
                  Agregar gasto
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddExpenseModal
        id_user={id_user}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
