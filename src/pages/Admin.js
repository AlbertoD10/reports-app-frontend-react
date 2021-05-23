import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Home from "./Home";
import Layout from "../components/Admin/Layout/Layout";

export default function Admin(props) {
  const useAuth = useContext(AuthContext);

  //If the user is not logged, dont show the admin page
  if (!useAuth.user && !useAuth.isLoading) {
    return (
      <>
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </>
    );
  }

  if (useAuth.user && !useAuth.isLoading) {
    return (
      <>
        <Layout {...props} />
      </>
    );
  }

  return null;
}
