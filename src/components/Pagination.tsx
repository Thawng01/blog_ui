import { PaginationType } from "../type";

interface Props {
    pagination: PaginationType | null;
    onMove: (url: string) => void;
}

const Pagination = ({ pagination, onMove }: Props) => {
    return (
        <div className="my-4 flex justify-center">
            {pagination?.links
                .filter((link) => link.url)
                .map((link) => {
                    return (
                        <button
                            onClick={() => onMove(link.url!)}
                            className={`${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-50"
                            } border border-[lightgray] px-3 py-1 mx-1 rounded-md`}
                        >
                            {link.label.includes("Previous")
                                ? link.label.split(" ")[1]
                                : link.label.split(" ")[0]}
                        </button>
                    );
                })}
        </div>
    );
};

export default Pagination;
