import { useNavigate } from "react-router-dom";

import Avatar from "./Avatar";
import LinkButton from "./shared/LinkButton";
import apiClient from "../api/apiClient";
import { useAuthContext } from "../hooks/useAuthContext";

function AuthenticatedUser({ name }: { name: string }) {
    const { setUser } = useAuthContext();

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const result = await apiClient.post(
                "auth/logout",
                {},
                {
                    withXSRFToken: true,
                    withCredentials: true,
                }
            );
            navigate("/login");
            if (result.data.status === "success") {
                setUser(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <LinkButton path="blogs/new" label="New Blog" />
            <Avatar name={name} />
            <button onClick={handleLogout} className="text-black font-medium">
                Logout
            </button>
        </div>
    );
}

export default AuthenticatedUser;
