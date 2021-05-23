import Home from "../pages/Home";
import Admin from "../pages/Admin";
// import Reports from "../components/Admin/Reports/Reports";
// import Layout from "../components/Admin/Layout/Layout";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/admin",
    component: Admin,
    exact: false,
    // routes: [
    //   {
    //     path: "/reports",
    //     exact: true,
    //     component: Reports,
    //   },
    // ],
  },
];

export default routes;
