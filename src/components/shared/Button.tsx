interface Props {
    label: string;
    disabled: boolean;
    loadingLabel: string;
}

const Button = ({ label, disabled, loadingLabel }: Props) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md disabled:bg-secondary"
        >
            {disabled ? loadingLabel : label}
        </button>
    );
};

export default Button;
