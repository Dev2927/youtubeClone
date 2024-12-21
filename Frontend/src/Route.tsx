import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: []
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