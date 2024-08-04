import { BiEdit, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Category } from "../type";
import { baseURL } from "../api/apiClient";

interface Props {
    id: number;
    title: string;
    desc: string;
    image: string;
    createdAt: string;
    author: string;
    category: Category;
    viewCount: string;
    userId: string;
    onDeleteItem: () => void;
}

const BlogPost = ({
    createdAt,
    id,
    title,
    desc,
    image,
    author,
    category,
    viewCount,
    userId,
    onDeleteItem,
}: Props) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    return (
        <div className="border flex-1 justify-between border-gray-200 p-4 rounded-md">
            <div>
                <img
                    src={`${baseURL}/storage/uploads/${image}`}
                    className="h-[150px] w-full object-cover"
                />

                <h2
                    className="text-xl font-bold my-2 flex-1 cursor-pointer hover:underline"
                    onClick={() => navigate("/blogs/" + id)}
                >
                    {title}
                </h2>

                <div className="flex items-center gap-2 text-gray-500">
                    <span>Created at</span>
                    <span>
                        {new Date(createdAt).toDateString()} | {category.name}
                    </span>
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
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 mt-4">
                    <BsEye />
                    <p>{viewCount}</p>
                </div>
                {userId === user?.user.id && (
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
                                        categoryId: category.id,
                                        category: category.name,
                                        image: image,
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
                )}
            </div>
        </div>
    );
};

export default BlogPost;
