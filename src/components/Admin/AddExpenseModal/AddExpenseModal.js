import React from "react";
import { Col, Form, Button, Modal } from "react-bootstrap";
import { getAccessTokenApi } from "../../../api/auth";
import { addExpenseApi } from "../../../api/employees";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";

import "./AddExpenseModal.scss";

export default function ListEmployees(props) {
  const { id_user } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="form">
        <AddExpenseForm id_user={id_user} />
      </div>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function AddExpenseForm(props) {
  const { id_user } = props;
  const schema = yup.object().shape({
    concept: yup.string().required("Ingrese el concepto"),
    date: yup
      .date()
      .typeError("Formato de fecha inválido")
      .required("Ingrese la fecha"),
    account: yup.string().required("Ingrese el tipo de cuenta"),
    description: yup.string().required("Ingrese una descripción"),
    total: yup
      .number()
      .typeError("El valor tiene que ser númerico")
      .required("El ingrese el total del gasto"),
  });

  const token = getAccessTokenApi();
  const handleSubmit = async (input, { setFieldError, resetForm }) => {
    console.log(input);
    //Connect to the api
    const result = await addExpenseApi(token, input, id_user);
    console.log(result);
    //  Validate the fields with the API response
    if (result.status === 200) {
      resetForm({});
      toast.success(result.message);
    } else {
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
    <>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          concept: "",
          id: id_user,
          date: "",
          account: "",
          description: "",
          total: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
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
                  disabled={values.id && id_user ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.id}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Concepto</Form.Label>
                <Form.Control
                  name="concept"
                  type="text"
                  value={values.concept}
                  required
                  onChange={handleChange}
                  isInvalid={touched.concept && !!errors.concept}
                  isValid={touched.concept && !errors.concept}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.concept}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  name="date"
                  type="date"
                  value={values.date}
                  required
                  onChange={handleChange}
                  isInvalid={touched.date && !!errors.date}
                  isValid={touched.date && !errors.date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Cuenta</Form.Label>
                <Form.Control
                  name="account"
                  type="text"
                  value={values.account}
                  required
                  onChange={handleChange}
                  isInvalid={touched.account && !!errors.account}
                  isValid={touched.account && !errors.account}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.account}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  value={values.description}
                  required
                  onChange={handleChange}
                  isInvalid={touched.description && !!errors.description}
                  isValid={touched.description && !errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Total </Form.Label>
                <Form.Control
                  name="total"
                  type="text"
                  value={values.total}
                  required
                  onChange={handleChange}
                  isInvalid={touched.total && !!errors.total}
                  isValid={touched.total && !errors.total}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.total}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="secondary" type="submit" block>
                Agregar
              </Button>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </>
  );
}
