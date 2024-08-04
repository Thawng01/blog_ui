import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import Filter from "../components/Filter";
import apiClient from "../api/apiClient";
import { Category, User } from "../type";

function Home() {
    const [filter, setFilter] = useState("All");
    const [authorFilter, setAuthorFilter] = useState("All");

    const [authors, setAuthors] = useState<User[] | []>([]);
    const [categories, setCategories] = useState<Category[] | []>([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await apiClient.get("categories");
                const newData = {
                    id: "All",
                    name: "All",
                    created_at: new Date(),
                    updated_at: new Date(),
                };

                const newCategory = [newData, ...res.data.categories];
                setCategories(newCategory);
            } catch (error) {}
        };

        getCategories();
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await apiClient.get("users");
                const newData = {
                    id: "All",
                    name: "All",
                    created_at: new Date(),
                    updated_at: new Date(),
                };

                const newAuthor = [newData, ...res.data.users];
                setAuthors(newAuthor);
            } catch (error) {}
        };

        getUsers();
    }, []);

    return (
        <div className="px-6 py-4">
            <div className="my-4 flex justify-between">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 ">
                    <Filter
                        label="Filter By Category"
                        categories={categories}
                        onSelect={setFilter}
                    />
                    <Filter
                        label="Filter By Author"
                        categories={authors}
                        onSelect={setAuthorFilter}
                    />
                </div>
            </div>
            <BlogList filter={filter} authorFilter={authorFilter} />
        </div>
    );
}

export default Home;
