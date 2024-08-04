import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import AuthenticatedUser from "./AuthenticatedUser";

const Navbar = () => {
    const { user } = useAuthContext();
    return (
        <header className="bg-white shadow-sm px-6 py-3 text-white flex justify-between">
            <h1 className="text-2xl text-black">Blog Website</h1>
            {user ? (
                <AuthenticatedUser name={user.user.name} />
            ) : (
                <div className="flex items-center">
                    <Link
                        to="/login"
                        className="mr-3 bg-primary border py-2 px-3 rounded-md font-medium"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="mr-3 bg-secondary border p-2 px-3 rounded-md text-black font-medium"
                    >
                        Register
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
