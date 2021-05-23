import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { getAccessTokenApi } from "../../../api/auth";
import { addEmployeeApi } from "../../../api/employees";
import { ToastContainer, toast } from "react-toastify";

import "./AddEmployee.scss";

export default function AddEmploye() {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="reports">
            <h4>Agregar nuevo empleado</h4>
            <EmployeeForm />
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

function EmployeeForm() {
  //Validation schema for the inputs
  const schema = yup.object().shape({
    name: yup.string().required("Ingrese el nombre"),
    lastname: yup.string().required("Ingrese el apellido"),
    id: yup.string().required("Ingrese la identificación del empleado"),
    position: yup.string().required("Ingrese la posición del empleado"),
    department: yup.string().required("Ingrese el departamento"),
    supervisor: yup.string().required("Ingrese el supervisor"),
  });

  const handleSubmit = async (input, { setFieldError, resetForm }) => {
    const token = getAccessTokenApi();

    //Connect to the api
    const result = await addEmployeeApi(token, input);
    //Validate the fields with the API response
    if (result.status === 200) {
      resetForm({});
      toast.success(result.message);
      return;
    } else {
      if (result.message === "Este empleado ya está registrado") {
        return setFieldError("id", result.message);
      }
      if (result.errors) {
        if (result.errors.length > 0) {
          result.errors.map(error => {
            return setFieldError(error.param, error.msg);
          });
        }
      }
      toast.error(result.message);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        name: "",
        lastname: "",
        id: "",
        position: "",
        department: "",
        supervisor: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={values.name}
                required
                onChange={handleChange}
                isInvalid={touched.name && !!errors.name}
                isValid={touched.name && !errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                name="lastname"
                type="text"
                value={values.lastname}
                required
                onChange={handleChange}
                isInvalid={touched.lastname && !!errors.lastname}
                isValid={touched.lastname && !errors.lastname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastname}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Identificación</Form.Label>
              <Form.Control
                name="id"
                type="text"
                value={values.id}
                required
                onChange={handleChange}
                isInvalid={touched.id && !!errors.id}
                isValid={touched.id && !errors.id}
              />
              <Form.Control.Feedback type="invalid">
                {errors.id}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Posición</Form.Label>
              <Form.Control
                name="position"
                type="text"
                value={values.position}
                required
                onChange={handleChange}
                isInvalid={touched.position && !!errors.position}
                isValid={touched.position && !errors.position}
              />
              <Form.Control.Feedback type="invalid">
                {errors.position}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                name="department"
                type="text"
                value={values.department}
                required
                onChange={handleChange}
                isInvalid={touched.department && !!errors.department}
                isValid={touched.department && !errors.department}
              />
              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Supervisor</Form.Label>
              <Form.Control
                name="supervisor"
                type="text"
                value={values.supervisor}
                required
                onChange={handleChange}
                isInvalid={touched.supervisor && !!errors.supervisor}
                isValid={touched.supervisor && !errors.supervisor}
              />
              <Form.Control.Feedback type="invalid">
                {errors.supervisor}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="secondary" type="submit" block>
              Agregar
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
}
