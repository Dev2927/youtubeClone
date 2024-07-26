import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import ProfilePage from "../UserSection/ProfilePage";
import ShowAllVideo from "../Videos/ShowAllVideo";
import UploadVideos from "../Videos/UploadVideos";
import Video from "../Videos/Video";
import WatchHistory from "../Videos/WatchHistory";
import YourVideos from "../Videos/YourVideos";
import Tweets from "../Tweets/Tweets";
import LikedVideos from "../Videos/LikedVideos";

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
            },
            {
                path: '/your/videos',
                element: <YourVideos />
            },
            {
                path: '/tweets',
                element: <Tweets />
            },
            {
                path: '/liked/videos',
                element: <LikedVideos />
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