import { useContext } from "react";
import { AuthContext } from "../context/Context";

export const useAuthContext = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error(
            "Auth context must be used inside authContextProvider."
        );
    }
    return authContext
}