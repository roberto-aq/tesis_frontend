import axios from 'axios';
import { useAuthStore } from '../store';

const api = axios.create({
	// Reemplaza esto por mi variable de entorno
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptors
api.interceptors.request.use(config => {
	const token = useAuthStore.getState().token;

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
});

export { api };
