import axios from "axios";


const kalumManagementApi = axios.create({
    baseURL: import.meta.env.VITE_KALUM_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

kalumManagementApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default kalumManagementApi;