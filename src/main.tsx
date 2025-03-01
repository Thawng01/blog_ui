import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes.tsx";
import { AuthContextProvider } from "./context/Context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </React.StrictMode>
);
