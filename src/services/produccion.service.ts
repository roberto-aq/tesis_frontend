import { api } from '../api/vaquinnova.api';
import { ProduccionResponse } from '../interfaces';

export class ProduccionService {
	static async getProduccionByAnimal(animalId: string) {
		try {
			const { data } = await api.get(
				`/produccion/animal/${animalId}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async createProduccion(
		produccion: ProduccionResponse,
		animalId: string
	) {
		try {
			const { data } = await api.post(
				`/produccion/${animalId}/new`,
				produccion
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async updateProduccion(
		produccion: ProduccionResponse,
		animalId: string,
		id: string
	) {
		try {
			const { data } = await api.patch(
				`/produccion/${animalId}/${id}`,
				produccion
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async deleteProduccion(id: string, animalId: string) {
		try {
			const { data } = await api.delete(
				`/produccion/${animalId}/${id}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async createOrUpdateProduccion(
		producciones: ProduccionResponse[]
	) {
		try {
			const { data } = await api.post(
				'/produccion/masiva',
				producciones
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async getProduccionByDate(date: string, fincaId: string) {
		try {
			const { data } = await api.get(`/produccion/byFecha`, {
				params: {
					fecha: date,
					fincaId,
				},
			});
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}
}
