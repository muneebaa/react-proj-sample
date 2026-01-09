import axios, {type AxiosInstance} from "axios"
import { STORAGE_KEYS } from "./localStorage";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 60000,
    withCredentials: true,
})

axiosInstance.interceptors.request.use(
    (config) => { 
        // Get access token from localStorage
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        
        // Set Authorization header if token exists
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.IS_FIRST_TIME_LOGIN);
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;