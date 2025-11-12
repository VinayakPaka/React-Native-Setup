import asyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://10.51.14.91:3000/';

const apiRequest = async (endpoint,
    method = "GET",
    body = null,
    requiresAuth = false
) => {
    try {
        const url = `${API_BASE_URL}{endpoints}`;
        const headers = {
            "Content-Type": "application/json"
        }

        if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
            config.body = JSON.stringify(body);
        }

        const config = {
            method,
            headers
        }

        const response = await fetch(url, config)
        const data = await response.json()
    } catch (error) {
        throw error;
    }
}

export const authApi = {
    signup: async (name, email, password) => {

    }
} 
