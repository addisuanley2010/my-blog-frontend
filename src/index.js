import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";

import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Authors from "./pages/Author";
import CreatePost from "./pages/CreatePost";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import CatagoryPosts from "./pages/CatagoryPost";
import AuthorsPosts from "./pages/AuthorsPosts";
import Dashboard from "./pages/Dashbord";
import EditPost from "./utl/EditPost";
import Logout from "./pages/Logout";

import PostDetail from "./pages/PostDetail";
import DeletePost from "./utl/DeletePost";
import UserProvider from "./context/UserContext";
import UploadImage from "./pages/UploadImage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "post/:id", element: <PostDetail /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },

      { path: "profile/:id", element: <UserProfile /> },
      { path: "authors", element: <Authors /> },
      { path: "create", element: <CreatePost /> },
      { path: "posts/catagories/:category", element: <CatagoryPosts /> },

      { path: "posts/users/:id", element: <AuthorsPosts /> },
      { path: "mypost", element: <Dashboard /> },
      { path: "post/:id/delete", element: <DeletePost /> },

      { path: "post/:id/edit", element: <EditPost /> },
            { path: "upload", element: <UploadImage /> },

      { path: "logout", element: <Logout /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
