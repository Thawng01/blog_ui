import { Link } from "react-router-dom";

interface Props {
    label: string;
    path: string;
}

const LinkButton = ({ label, path }: Props) => {
    return (
        <Link
            to={path}
            className="text-black border p-2 border-gray-300 rounded-md"
        >
            {label}
        </Link>
    );
};

export default LinkButton;
