import { useState, useEffect } from "react";
import BlogPost from "./BlogPost";
import apiClient from "../api/apiClient";
import { Blog } from "../type";
import { useAuthContext } from "../hooks/useAuthContext";

const BlogList = () => {
    const { user } = useAuthContext();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                setLoading(true);
                const result = await apiClient.get("blogs/" + user?.email);
                setBlogs(result.data.blogs);
            } catch (error) {
                setError("The error occurred while fetching the data.");
            } finally {
                setLoading(false);
            }
        };

        getBlogs();
    }, [user]);

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete("blogs/" + id, {
                withCredentials: true,
                withXSRFToken: true,
            });
            const updatedBlogs = blogs.filter((blog: Blog) => blog.id !== id);
            setBlogs(updatedBlogs);
        } catch (error) {
            setError("Deleting item failed.");
        }
    };

    let content: any;
    if (loading) {
        content = <p>Loading...</p>;
    } else if (blogs.length === 0) {
        content = <p className="font-medium text-lg">No blog post.</p>;
    } else if (blogs.length > 0) {
        content = (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {blogs.map((blog: Blog) => (
                    <BlogPost
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        desc={blog.description}
                        createdAt={blog.created_at}
                        onDeleteItem={() => handleDelete(blog.id)}
                    />
                ))}
            </div>
        );
    } else {
        content = <p className="text-[red]">{error}</p>;
    }

    return <div className="px-6 py-4">{content}</div>;
};

export default BlogList;
