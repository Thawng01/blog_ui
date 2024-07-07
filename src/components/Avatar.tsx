interface Props {
    name: string;
}

const Avatar = ({ name }: Props) => {
    return (
        <div
            className={`rounded-full bg-primary flex items-center justify-center h-8 w-8`}
        >
            <span className="capitalize text-white text-lg font-medium">
                {name?.slice(0, 1)}
            </span>
        </div>
    );
};

export default Avatar;
