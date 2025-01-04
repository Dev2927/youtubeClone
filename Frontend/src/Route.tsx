import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
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