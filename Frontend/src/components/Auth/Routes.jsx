import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import ProfilePage from "../UserSection/ProfilePage";
import ShowAllVideo from "../Videos/ShowAllVideo";
import UploadVideos from "../Videos/UploadVideos";
import Video from "../Videos/Video";
import WatchHistory from "../Videos/WatchHistory";

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
            },
            {
                path: '/upload/videos',
                element: <UploadVideos />
            },
            {
                path: '/video',
                element: <Video />
            },
            {
                path: '/videos/history',
                element: <WatchHistory />
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