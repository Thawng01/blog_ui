import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface Props {
    id: number;
    title: string;
    desc: string;
    createdAt: string;
    author: string;
    onDeleteItem: () => void;
}

const BlogPost = ({
    createdAt,
    id,
    title,
    desc,
    author,
    onDeleteItem,
}: Props) => {
    const navigate = useNavigate();

    return (
        <div className="border border-gray-200 p-4 rounded-md">
            <div className="flex items-start">
                <h2
                    className="text-xl font-bold mb-2 flex-1 cursor-pointer hover:underline"
                    onClick={() => navigate("/blogs/" + id)}
                >
                    {title}
                </h2>
                <div className="flex items-center gap-3 z-20">
                    <BiEdit
                        size={24}
                        className="cursor-pointer"
                        onClick={() =>
                            navigate("/blogs/new", {
                                state: {
                                    id,
                                    title: title,
                                    desc: desc,
                                },
                            })
                        }
                    />
                    <BiTrash
                        size={24}
                        color="red"
                        className="cursor-pointer"
                        onClick={onDeleteItem}
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
                <span>Created at</span>
                <span>{new Date(createdAt).toDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
                <span>Author : </span>
                <span className="text-slate-900">{author}</span>
            </div>
            <p className="mt-2">
                {desc.slice(0, 70)}
                {desc.length > 70 ? "..." : ""}
            </p>
        </div>
    );
};

export default BlogPost;
