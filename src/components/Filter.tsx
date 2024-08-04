import { Dispatch, SetStateAction } from "react";
import { Category } from "../type";

interface Props {
    categories: any[];
    label: string;
    onSelect: Dispatch<SetStateAction<string>>;
}
const Filter = ({ label, categories, onSelect }: Props) => {
    return (
        <div className="flex items-center gap-3">
            <p className="font-bold">{label}</p>
            <select
                className="border px-2 py-1 rounded-md"
                onChange={(e) => onSelect(e.target.value)}
            >
                {categories.map((category) => (
                    <option value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
