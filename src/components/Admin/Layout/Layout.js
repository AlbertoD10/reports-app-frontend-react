import React from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import AddEmployee from "../AddEmployee/AddEmployee";
import ListEmployees from "../ListEmployees/ListEmployees";
import ReportEmployee from "../ReportsEmployee/ReportEmployee";
export default function Layout() {
  return (
    <>
      <NavBar />
      <Container>
        <Switch>
          <Route path="/admin/add-employee">
            <AddEmployee />
          </Route>

          <Route path="/admin/list-employees">
            <ListEmployees />
          </Route>

          <Route path="/admin/report-employee">
            <ReportEmployee />
          </Route>
        </Switch>
      </Container>
    </>
  );
}
