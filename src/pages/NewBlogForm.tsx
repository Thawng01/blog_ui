import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../components/shared/Button";
import apiClient from "../api/apiClient";

interface Blog {
    title: string;
    description: string;
}

const BlogForm = () => {
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Blog>({
        defaultValues: {
            title: state?.title || "",
            description: state?.desc || "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (data: Blog) => {
        try {
            setLoading(true);
            if (state?.id) {
                await apiClient.put("blogs/" + state.id, data, {
                    withCredentials: true,
                    withXSRFToken: true,
                });
                navigate("/", { replace: true });
            } else {
                await apiClient.post("blogs/new", data, {
                    withCredentials: true,
                    withXSRFToken: true,
                });
                navigate("/", { replace: true });
            }
        } catch (error: any) {
            setError(error?.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            {error && <p className="text-[red]">{error}</p>}
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 ring-primary"
                        placeholder="Enter title"
                        {...register("title", { required: true })}
                    />
                    {errors.title && (
                        <p className="text-[red]">Title is required.</p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="border border-gray-300 rounded-md p-2 w-full h-32 focus:outline-none focus:ring-2 ring-primary"
                        placeholder="Enter description"
                        {...register("description", { required: true })}
                    ></textarea>
                    {errors.description && (
                        <p className="text-[red]">Description is required.</p>
                    )}
                </div>
                <Button
                    label={state?.id ? "Update Post " : "Add New Post"}
                    disabled={loading}
                    loadingLabel={
                        state?.id ? "Updating Post..." : "Adding New Post..."
                    }
                />
            </form>
        </div>
    );
};

export default BlogForm;
