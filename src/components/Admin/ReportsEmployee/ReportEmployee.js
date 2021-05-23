import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import { getAccessTokenApi } from "../../../api/auth";
import { getEmployeeApi } from "../../../api/employees";
import { ToastContainer, toast } from "react-toastify";
import "./ReportEmployee.scss";

export default function ReportEmployee(props) {
  const [employees, setEmployees] = useState();
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({ id: "" });
  const [concept, setConcept] = useState([]);
  const [conceptToShow, setConceptToShow] = useState("Todos");

  const [dateRange, setDateRange] = useState({ max: "", min: "" });

  const token = getAccessTokenApi();
  const employee = localStorage.getItem("employee_id");
  const onChangeForm = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOption = e => {
    setConceptToShow(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      getEmployeeApi(token, inputs.id).then(result => {
        if (result.status === 200) {
          toast.success(result.message);
          setEmployees(result.userStored);
          localStorage.setItem("employee_id", inputs.id);

          return;
        } else {
          toast.error(result.message);
          return;
        }
      });

      setValidated(true);
    }
  };

  useEffect(() => {
    if (employee) {
      setInputs(employee);
      getEmployeeApi(token, employee).then(result => {
        setEmployees(result.userStored);
        setConcept(
          result.userStored.expenses.map(field => {
            return field.concept;
          })
        );
      });
    }
  }, []);

  const conceptFiltred = concept.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="report-employee">
            <h4 className="mb-3">Reporte de gastos</h4>

            <Form
              className="mb-4"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              onChange={onChangeForm}
            >
              <InputGroup name="id" as={Col} md="12">
                <Form.Control
                  placeholder="Ingrese identificación del empleado"
                  name="id"
                  type="text"
                  required
                  defaultValue={employee ? employee : ""}
                />
                <Button variant="outline-secondary" type="submit">
                  Buscar
                </Button>

                <Form.Control.Feedback type="invalid">
                  Ingrese la identificación
                </Form.Control.Feedback>
              </InputGroup>
            </Form>
            {!employees ? (
              <h4>No hay datos para mostrar</h4>
            ) : (
              <>
                <Row className="d-flex align-items-baseline">
                  <Col md={6}>
                    <Row className="d-flex align-items-baseline">
                      <Col md={2}>
                        <span className="font-weight-bold"> Concepto: </span>
                      </Col>
                      <Col md={10}>
                        <Form.Group as={Col}>
                          <Form.Control
                            as="select"
                            defaultValue={conceptToShow}
                            onChange={handleChangeOption}
                          >
                            <option>Todos</option>

                            {conceptFiltred.map((opt, i) => (
                              <option key={i}>{opt}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>

                  <Col md={6}>
                    <p>
                      <span className="font-weight-bold">Fecha desde: </span>
                      {dateRange.min}
                      <span className="font-weight-bold"> hasta: </span>
                      {dateRange.max}
                    </p>
                  </Col>
                </Row>
                <h5 className="mb-3">Información del empleado</h5>
                <Alert variant="secondary">
                  <Row>
                    <Col md={6}>
                      <p>
                        <span className="font-weight-bold"> Nombre: </span>
                        {employees.name} {employees.lastname}
                      </p>
                      <p>
                        <span className="font-weight-bold">Departamento:</span>
                        {employees.department}
                      </p>
                    </Col>

                    <Col md={6}>
                      <p>
                        <span className="font-weight-bold"> Posición: </span>
                        {employees.position}
                      </p>
                      <p>
                        <span className="font-weight-bold"> Supervisor: </span>
                        {employees.supervisor}
                      </p>
                    </Col>
                  </Row>
                </Alert>
                <List
                  expenses={employees.expenses}
                  conceptToShow={conceptToShow}
                  setDateRange={setDateRange}
                />
              </>
            )}
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
  const { expenses, setDateRange, conceptToShow } = props;
  let arrayByConcept = expenses;

  //Saco solo el concepto seleccionado arriba
  if (conceptToShow !== "Todos") {
    arrayByConcept = expenses.filter(original => {
      if (original.concept === conceptToShow) {
        return original;
      }
    });
  }

  //To sum the total
  let total = arrayByConcept.map(num => {
    return num.total;
  });
  total = total.reduce((a, b) => a + b, 0);

  let dates = arrayByConcept.map(value => {
    const dat = new Date(value.date);
    return dat;
  });

  let maxDate = new Date(Math.max(...dates));
  let minDate = new Date(Math.min(...dates));

  useEffect(() => {
    setDateRange({
      max: maxDate.toLocaleDateString(),
      min: minDate.toLocaleDateString(),
    });
  }, []);

  return (
    <>
      <Table striped bordered hover variant="light" responsive>
        <thead className="thead-dark">
          <tr>
            <th>Fecha</th>
            <th>Cuenta</th>
            <th>Descripción</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {arrayByConcept.map((expense, i) => {
            let date = new Date(expense.date);

            return (
              <tr key={i}>
                <td>{date.toLocaleDateString()}</td>
                <td>{expense.account}</td>
                <td>{expense.description}</td>
                <td>{expense.total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p className="text-right">Monto a cancelar al empleado: B/. {total}</p>
    </>
  );
}
