import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "./shared/Button";
import apiClient from "../api/apiClient";
import Overlay from "./OverLay";
import { getCookie } from "../utils";
import { useAuthContext } from "../hooks/useAuthContext";

interface Category {
    name: string;
}

interface Props {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewCategory = ({ onClose }: Props) => {
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Category>();

    const onSubmit = async (data: Category) => {
        try {
            setLoading(true);
            await apiClient.post("categories/create", data, {
                headers: {
                    Authorization: "Bearer " + user?.token,
                },
            });
            onClose(false);
        } catch (error: any) {
            setError(error?.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" fixed top-0 left-0 w-full h-screen">
            <Overlay onClick={onClose} />
            <div className="w-[330px] p-4 rounded-md absolute z-20 bg-white top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]">
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
                            id="name"
                            className="border border-gray-300 rounded-md p-2 text-black w-full focus:outline-none focus:ring-2 ring-primary"
                            placeholder="Enter title"
                            {...register("name", { required: true })}
                        />
                        {errors.name && (
                            <p className="text-[red]">Name is required.</p>
                        )}
                    </div>
                    <Button
                        label={state?.id ? "Update" : "Create"}
                        disabled={loading}
                        loadingLabel={
                            state?.id ? "Updating Category..." : "Creating..."
                        }
                    />
                </form>
            </div>
        </div>
    );
};

export default NewCategory;
