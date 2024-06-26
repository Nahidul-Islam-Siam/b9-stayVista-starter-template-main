import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import DashboarLayout from "../layouts/DashboarLayout";
import Statistics from "../pages/Dashbored/Common/Statistics";
import AddRoom from "../pages/Dashbored/Host/AddRoom";
import MyListings from "../pages/Dashbored/Host/MyListings";
import Profile from "../pages/Dashbored/Common/Profile";
import ManageUsers from "../pages/Dashbored/Admin/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room/:id",
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: <DashboarLayout></DashboarLayout>,
    children: [
      {
        index: true,
        element: <Statistics></Statistics>,
      },
      {
        path: 'add-room',
        element: <AddRoom></AddRoom>,
      },
      {
        path: 'my-listings',
        element: <MyListings></MyListings>,
      },
      {
        path: 'manage-users',
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: 'Profile',
        element: <Profile/>,
      }
    ],
  },
]);
