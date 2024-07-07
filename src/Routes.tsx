import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginForm from "./pages/auth/Login";
import RegisterForm from "./pages/auth/Register";
import NewBlogForm from "./pages/NewBlogForm";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <LoginForm />,
            },
            {
                path: "/register",
                element: <RegisterForm />,
            },
            {
                path: "/",
                element: <Home />,
            },

            {
                path: "/blogs/new",
                element: <NewBlogForm />,
            },
            {
                path: "/blogs/:id",
                element: <BlogDetail />,
            },
        ],
    },
]);

export default router;
