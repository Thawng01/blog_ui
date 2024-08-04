import { useState, useEffect } from "react";
import BlogPost from "./BlogPost";
import apiClient from "../api/apiClient";
import { Blog, PaginationType } from "../type";
import { useAuthContext } from "../hooks/useAuthContext";
import Pagination from "./Pagination";

interface Props {
    filter: string;
    authorFilter: string;
}

const BlogList = ({ filter, authorFilter }: Props) => {
    const { user } = useAuthContext();
    const [blogs, setBlogs] = useState([]);
    const [pagination, setPagination] = useState<PaginationType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getBlogs = async (url: string) => {
        try {
            setLoading(true);
            const result = await apiClient.get(url, {
                params: {
                    filter,
                    authorFilter,
                },
            });

            setPagination({
                per_page: result.data.blogs.per_page,
                links: result.data.blogs.links,
                totalPages: result.data.blogs.total,
            });
            setBlogs(result.data.blogs.data);
        } catch (error) {
            setError("The error occurred while fetching the data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlogs("blogs");
    }, [user, filter, authorFilter]);

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete("blogs/" + id, {
                headers: {
                    Authorization: "Bearer " + user?.token,
                },
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
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                    {blogs.map((blog: Blog) => (
                        <BlogPost
                            key={blog.id}
                            id={blog.id}
                            title={blog.title}
                            desc={blog.description}
                            createdAt={blog.created_at}
                            author={blog.user.name}
                            image={blog.image}
                            userId={blog.user_id}
                            category={blog.category}
                            viewCount={blog.view_count}
                            onDeleteItem={() => handleDelete(blog.id)}
                        />
                    ))}
                </div>
                {pagination?.totalPages! > pagination?.per_page! && (
                    <Pagination
                        pagination={pagination}
                        onMove={(value) => getBlogs(value)}
                    />
                )}
            </>
        );
    } else {
        content = <p className="text-[red]">{error}</p>;
    }

    return <>{content}</>;
};

export default BlogList;
