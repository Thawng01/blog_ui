import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import FormInput from "../../components/auth/FormInput";
import { getCookie } from "../../utils";
import { useAuthContext } from "../../hooks/useAuthContext";
import Button from "../../components/shared/Button";
import apiClient from "../../api/apiClient";

interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginFormData>();

    const { setUser } = useAuthContext();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoading(true);

            const result = await apiClient.post("auth/login", data, {
                headers: {
                    "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
                },
                withCredentials: true,
                withXSRFToken: true,
            });

            if (result.data.status === "success") {
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
            }

            if (result.data.status === "error") {
                setError(result.data.error);
            }
        } catch (error: any) {
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
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Your email"
                    register={register}
                    errors={errors}
                />
                <FormInput
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Your password"
                    register={register}
                    errors={errors}
                />
                <Button
                    label="Login"
                    disabled={loading}
                    loadingLabel="Logging..."
                />
            </form>{" "}
        </div>
    );
};

export default LoginForm;
