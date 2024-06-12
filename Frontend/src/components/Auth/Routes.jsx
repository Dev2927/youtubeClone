import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import ProfilePage from "../UserSection/ProfilePage";
import ShowAllVideo from "../UserSection/ShowAllVideo";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/profilepage',
                element: <ProfilePage />
            },
            {
                path: '/',
                element: <ShowAllVideo />
            }
        ],
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