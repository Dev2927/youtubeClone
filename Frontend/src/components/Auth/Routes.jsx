import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [],
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'signup',
        element: <Signup />
    }
]);

export default router