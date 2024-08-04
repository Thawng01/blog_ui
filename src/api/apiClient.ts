import axios from "axios"

export const baseURL = 'http://127.0.0.1:8000'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const apiClient = axios.create({
    baseURL: baseURL + '/api',
});

// Intercept request to ensure CSRF token is present
apiClient.interceptors.request.use(async (config) => {

    await axios.get(`http://localhost:8000/sanctum/csrf-cookie`, {
        withCredentials: true,
    });

    // config.headers['X-XSRF-TOKEN'] = getCookie("XSRF-TOKEN");
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
