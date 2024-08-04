import { useState } from "react";
import FormInput from "../../components/auth/FormInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { getCookie } from "../../utils";
import { useAuthContext } from "../../hooks/useAuthContext";
import Button from "../../components/shared/Button";
import apiClient from "../../api/apiClient";

interface LoginFormData {
    name?: string;
    email: string;
    password: string;
}

const RegisterForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setUser } = useAuthContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoading(true);
            const result = await apiClient.post("users/new", data, {
                headers: {
                    Accept: "application/json",
                    "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
                },
            });

            const { user } = result.data;
            setUser(user);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                })
            );

            navigate("/", { replace: true });
        } catch (error: any) {
            console.log(error);
            setError(error?.response?.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 mx-auto w-full sm:w-96 md:w-80">
            {error && <p className="text-[red]">{error}</p>}
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <FormInput
                    type="text"
                    label="Name"
                    name="name"
                    placeholder="Enter Your Name"
                    register={register}
                    errors={errors}
                />

                <FormInput
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Enter Your Email"
                    register={register}
                    errors={errors}
                />
                <FormInput
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Enter Your Password"
                    register={register}
                    errors={errors}
                />

                <Button
                    label="Register"
                    disabled={loading}
                    loadingLabel="Registering..."
                />
            </form>
        </div>
    );
};

export default RegisterForm;
