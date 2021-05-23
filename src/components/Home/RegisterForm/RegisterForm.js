import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { signUpApi } from "../../../api/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Validation schema for the inputs
const schema = yup.object().shape({
  name: yup.string().required("Ingrese su nombre"),
  lastname: yup.string().required("Ingrese su apellido"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Debe ingresar su email"),
  password: yup
    .string()
    .min(5, "Mínimo 5 carácteres")
    .required("Ingrese una contraseña"),
  repeatpassword: yup
    .string()
    .required("Repita su contraseña")
    .oneOf([yup.ref("password"), null], "Las contraseñas deben ser iguales"),
});

export default function RegisterForm() {
  const handleSubmit = async (input, { setFieldError, resetForm }) => {
    //Connect to the api
    const result = await signUpApi(input);

    //Validate the fields with the API response
    if (result.status === 200) {
      resetForm({});
      toast.success(result.message);
      return;
    } else {
      if (result.message === "Este email ya está registrado") {
        setFieldError("email", result.message);
        return;
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
    <>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          name: "",
          lastname: "",
          email: "",
          password: "",
          repeatpassword: "",
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

              <Form.Group as={Col} md="12">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={values.email}
                  required
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Contaseña</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  value={values.password}
                  required
                  onChange={handleChange}
                  isInvalid={touched.password && !!errors.password}
                  isValid={touched.password && !errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Repita la contraseña</Form.Label>
                <Form.Control
                  name="repeatpassword"
                  type="password"
                  value={values.repeatpassword}
                  required
                  onChange={handleChange}
                  isInvalid={touched.repeatpassword && !!errors.repeatpassword}
                  isValid={touched.repeatpassword && !errors.repeatpassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.repeatpassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="secondary" type="submit" block>
                Iniciar sesión
              </Button>
            </Form.Row>
          </Form>
        )}
      </Formik>
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
    </>
  );
}
