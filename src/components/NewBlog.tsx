// src/components/BlogForm.js
import React, { useState } from "react";

const BlogForm = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if title or description is empty
        if (!title.trim() || !description.trim()) {
            alert("Please enter both title and description.");
            return;
        }
        // Call the parent onSubmit handler with the new post data
        onSubmit({ title, description });
        // Clear form fields after submission
        setTitle("");
        setDescription("");
    };

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    htmlFor="title"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Enter title"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full h-32"
                    placeholder="Enter description"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
                Add Blog Post
            </button>
        </form>
    );
};

export default BlogForm;
