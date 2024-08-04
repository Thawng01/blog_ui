import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";

import Button from "../components/shared/Button";
import apiClient, { baseURL } from "../api/apiClient";
import { Category } from "../type";
import { useAuthContext } from "../hooks/useAuthContext";

interface Blog {
    title: string;
    description: string;
    category: string;
    image: string;
}

const BlogForm = () => {
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(state?.image || "");
    const [image, setImage] = useState<File | undefined>();
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[] | []>([]);
    const [imageToEdit, setImageToEdit] = useState(state?.image);

    const { user } = useAuthContext();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Blog>({
        defaultValues: {
            title: state?.title || "",
            description: state?.desc || "",
            category: state?.categoryId || "",
            image: state?.image || "",
        },
    });

    const navigate = useNavigate();

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setImagePreview(imageUrl);
            // remove old image when select new image
            setImageToEdit("");
        }
    };

    const handleImageRemove = () => {
        setImagePreview("");
        setValue("image", "");
        // remove old image when select new image
        setImageToEdit("");
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await apiClient.get("categories");
                setCategories(res.data.categories);
            } catch (error) {}
        };
        getCategories();
    }, []);

    const onSubmit = async (data: Blog) => {
        try {
            const newData = {
                title: data.title,
                description: data.description,
                category: data.category,
                image,
            };
            setLoading(true);

            if (state?.id) {
                await apiClient.post("/blogs/update/" + state.id, newData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + user?.token,
                    },
                });

                navigate("/", { replace: true });
            } else {
                await apiClient.post("blogs/create", newData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + user?.token,
                    },
                });
                navigate("/", { replace: true });
            }
        } catch (error: any) {
            console.log("error : ", error);
            setError(error?.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 mx-auto max-w-[500px]">
            {error && <p className="text-[red]">{error}</p>}
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="mb-3">
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
                <div className="mb-3">
                    <label
                        htmlFor="category"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Category
                    </label>
                    <select
                        {...register("category", { required: true })}
                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 ring-primary"
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        {categories.map((category) => {
                            const selected = category.id === state?.categoryId;
                            return (
                                <option selected={selected} value={category.id}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </select>
                    {errors.category && (
                        <p className="text-[red]">Category is required.</p>
                    )}
                </div>
                <div className="mb-3">
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
                <div className="mb-3">
                    <label
                        htmlFor="image"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Choose image
                    </label>
                    <input
                        type="file"
                        id="image"
                        {...register("image")}
                        onChange={handleImageChange}
                    />

                    {imagePreview && (
                        <div className="w-full h-[250px] mt-3 relative">
                            <div
                                onClick={handleImageRemove}
                                className="absolute top-2 right-2 cursor-pointer rounded-full bg-transparentBg"
                            >
                                <BsX size={24} className="text-white" />
                            </div>
                            <img
                                src={
                                    imageToEdit
                                        ? `${baseURL}/storage/uploads/${imagePreview}`
                                        : imagePreview
                                }
                                className="object-cover w-full h-full rounded-md"
                            />
                        </div>
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
