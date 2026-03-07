import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://api.themoviedb.org/3"
});

export default api;