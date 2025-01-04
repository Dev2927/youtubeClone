import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
<<<<<<< HEAD
import Dashboard from "./Dashboard/Dashboard";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/Dashboard",
                element: <Dashboard />
            }
        ]
=======

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: []
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    }
])

export default Routes