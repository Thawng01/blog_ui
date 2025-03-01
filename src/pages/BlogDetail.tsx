import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import { Blog } from "../type";
import { BsEye } from "react-icons/bs";

const BlogDetail = () => {
    const { id } = useParams();

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBlog = useCallback(async () => {
        try {
            setLoading(true);
            const result = await apiClient.get("blogs/" + id);
            setBlog(result.data.blog);
        } catch (error) {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    const updateViewCount = useCallback(async () => {
        try {
            await apiClient.post("blogs/view/" + id, {});
        } catch (error) {
            console.log("error updading : ", error);
            setError("Something went wrong.");
        }
    }, [id]);

    useEffect(() => {
        updateViewCount();
        fetchBlog();
    }, [updateViewCount, fetchBlog]);

    let content: any;
    if (loading) {
        content = <p>Loading...</p>;
    } else if (!blog) {
        content = <p>No found blog with the given id.</p>;
    } else if (blog) {
        content = (
            <div>
                <h1 className="text-xl font-bold mb-2 flex-1">{blog.title}</h1>
                <div className="flex items-center gap-2 text-gray-500">
                    <span>Created at </span>
                    <span>{new Date(blog.created_at).toDateString()}</span>
                </div>
                <p className="mt-2">{blog.description}</p>
                <div className="flex items-center gap-3 mt-4">
                    <BsEye />
                    <p>{blog.view_count}</p>
                </div>
            </div>
        );
    } else {
        content = <p className="text-[red]">{error}</p>;
    }

    return <div className="p-6 mx-auto w-full md:w-1/2">{content}</div>;
};

export default BlogDetail;
