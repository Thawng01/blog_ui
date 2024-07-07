import { FieldErrors, UseFormRegister } from "react-hook-form";

interface LoginFormData {
    name?: string;
    email: string;
    password: string;
}
interface Props {
    label: string;
    placeholder: string;
    name: "name" | "email" | "password";
    type: string;
    errors: FieldErrors<LoginFormData>;
    register: UseFormRegister<LoginFormData>;
}

const FormInput = ({
    label,
    name,
    placeholder,
    type,
    errors,
    register,
}: Props) => {
    return (
        <div className="mb-4">
            <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
            >
                {label}
            </label>
            <input
                type={type}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 ring-primary"
                placeholder={placeholder}
                {...register(name, { required: true })}
            />
            {errors[name] && <p className="text-[red]">{label} is required.</p>}
        </div>
    );
};
export default FormInput;
