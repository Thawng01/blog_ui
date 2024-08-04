/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1a75ff",
                secondary: "#e6e6e6",
                transparentBg: "rgba(0, 0, 0, 0.2)",
            },
        },
    },
    plugins: [],
};
