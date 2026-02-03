import axios from "axios";

export const BASE_URL = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
});