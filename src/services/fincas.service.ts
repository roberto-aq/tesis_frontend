import { api } from '../api/vaquinnova.api';
import { FincasResponse } from '../interfaces';

export class FincasService {
	static async getFincas(page = 1, limit = 10, searchTerm = '') {
		try {
			const { data } = await api.get('finca/admin/fincas', {
				params: { page, limit, searchTerm },
			});

			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async createFinca(finca: FincasResponse) {
		try {
			const { data } = await api.post('finca/new', finca);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async getFincaById(id: string) {
		try {
			const { data } = await api.get(`finca/admin/fincas/${id}`);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async updateFinca(id: string, finca: FincasResponse) {
		try {
			const { data } = await api.patch(
				`finca/admin/fincas/${id}`,
				finca
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async deleteFinca(id: string) {
		try {
			const { data } = await api.delete(`finca/admin/fincas/${id}`);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	// Método de obtener Finca para usuario
	static async getFincaByUser(fincaId: string) {
		try {
			const { data } = await api.get(`finca/${fincaId}`);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}
}
