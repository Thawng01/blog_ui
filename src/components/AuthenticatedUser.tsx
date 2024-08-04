import { useNavigate } from "react-router-dom";

import Avatar from "./Avatar";
import LinkButton from "./shared/LinkButton";
import apiClient from "../api/apiClient";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import NewCategory from "./NewCategory";
import { getCookie } from "../utils";

function AuthenticatedUser({ name }: { name: string }) {
    const { setUser } = useAuthContext();
    const [showModel, setShowModel] = useState<boolean>(false);

    const handleLogout = async () => {
        try {
            await apiClient.post(
                "auth/logout",
                {},
                {
                    headers: {
                        Accept: "application/json",
                        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
                    },
                }
            );

            setUser(null);
            localStorage.removeItem("user");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex items-center gap-4">
                <LinkButton path="blogs/new" label="New Blog" />
                <button
                    className="text-black border p-2 rounded-md"
                    onClick={() => setShowModel(true)}
                >
                    Create Category
                </button>
                <Avatar name={name} />
                <button
                    onClick={handleLogout}
                    className="text-black font-medium"
                >
                    Logout
                </button>
            </div>
            {showModel && <NewCategory onClose={setShowModel} />}
        </>
    );
}

export default AuthenticatedUser;
