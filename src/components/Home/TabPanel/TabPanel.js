import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import "./TabPanel.scss";

export default function TabPanel() {
  const [key, setKey] = useState("login");

  return (
    <div className="tab-panel ">
      <Tabs
        defaultActiveKey="login"
        transition={false}
        id="noanim-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="login" title="Iniciar sesión">
          <LoginForm />
        </Tab>
        <Tab eventKey="register" title="Registrarse">
          <RegisterForm />
        </Tab>
      </Tabs>
    </div>
  );
}
