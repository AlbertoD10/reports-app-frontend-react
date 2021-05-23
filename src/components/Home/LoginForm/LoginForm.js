import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { loginApi } from "../../../api/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

//Validation schema for the inputs
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Debe ingresar su email"),
  password: yup.string().required("Ingrese una contraseña"),
});

export default function RegisterForm() {
  const handleSubmit = async (input, { setFieldError, resetForm }) => {
    //Connect to the api
    const result = await loginApi(input);

    //Validate the fields with the API response
    if (result.status === 200) {
      resetForm({});
      console.log(result);

      //Save the TOKEN in th LS
      localStorage.setItem(ACCESS_TOKEN, result.accessToken);
      localStorage.setItem(REFRESH_TOKEN, result.refreshToken);
      window.location.href = "/admin/report-employee";
    } else {
      if (result.message === "Contraseña incorrecta") {
        setFieldError("password", result.message);
        return;
      } else if (result.message === "Email no registrado") {
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
          email: "",
          password: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
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

              <Form.Group as={Col} md="12">
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
