import { Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import BlogList from "../components/BlogList";

function Home() {
    const { user } = useAuthContext();
    if (!user) return <Navigate to="/login" />;
    return <BlogList />;
}

export default Home;
