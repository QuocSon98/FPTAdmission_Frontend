import axios from "axios"
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import type { RegisterFormData } from "../models/loginModel";

const baseURL = "http://localhost:8080/api"

export const api = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor to add token to headers
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token")
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error: AxiosError) => {
    console.error("Request error:", error);
    return Promise.reject(error);
});

// Interceptor to handle response
api.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error: AxiosError) => {
    console.error("Response error:", error);
    return Promise.reject(error);
});

export const loginAPI = ({ userName, password }: { userName: string; password: string }) => {
    return api.post('auth/login', { userName, password });
}
export const registerAPI = (data: RegisterFormData) => {
    return api.post('auth/register', data)
}
export const resetPasswordAPI = (password: string, token: string) => {
    return api.post('auth/reset-password', { password },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export const forgotPasswordAPI = (email: string) => {
    return api.post('auth/forgot-password', { email })
}

export const changePasswordAPI = (data: any) => {
    return api.post('auth/change-password', data)
}
