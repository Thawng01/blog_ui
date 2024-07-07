import axios from "axios";
const apiClient = axios.create({
    baseURL: "http://localhost:8000/api/",

})

apiClient.interceptors.request.use(async (config) => {
    if (!document.cookie.includes("XSRF-TOKEN")) {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
            withCredentials: true,
        });

    }
    return config
})


export default apiClient