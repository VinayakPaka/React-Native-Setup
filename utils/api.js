import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorage from '@react-native-async-storage/async-storage';



import { Platform } from 'react-native';

// Dynamically set API URL based on platform
// For web: use localhost
// For mobile: use your computer's local IP address
const getApiBaseUrl = () => {
    if (Platform.OS === 'web') {
        return 'http://localhost:3000';
    } else {
        // Your computer's current IP address (found via ipconfig)
        // Make sure your mobile device is on the same WiFi network
        return 'http://192.168.29.117:3000';
    }
};

const API_BASE_URL = getApiBaseUrl();

export const getToken = () => {

};

export const saveToken = async(token) => {
    try {
        await AsyncStorage.setItem('authToken', token)
        return token
    } catch (error) {
        console.error("Token cannot be Saved");
        return null
    }
}; 

const apiRequest = async (endpoint,
    method = "GET",
    body = null,
    requiresAuth = false
) => {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            "Content-Type": "application/json"
        }

        const config = {
            method,
            headers
        }

       

        if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
            config.body = JSON.stringify(body);
        }

        

        const response = await fetch(url, config)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export const authApi = {
    signup: async (name, email, password) => {
        return apiRequest('/api/auth/signup', "POST", {name, email, password})
    },

    login: async (email, password) => {
        return apiRequest('/api/auth/signup', "POST", {email, password})
    },
} ;
