import { api } from '../api/vaquinnova.api';
import { PesoResponse } from '../interfaces';

export class PesajeAnimalService {
	static getHistorialPesosByAnimalId = async (animalId: string) => {
		try {
			const { data } = await api.get<PesoResponse[]>(
				`/pesos/${animalId}`
			);
			console.log(data);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static createPeso = async (
		peso: PesoResponse,
		animalId: string
	) => {
		try {
			const { data } = await api.post<PesoResponse>(
				`/pesos/${animalId}/new`,
				peso
			);
			console.log(data);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static updatePeso = async (
		peso: PesoResponse,
		animalId: string,
		pesoId: string
	) => {
		try {
			const { data } = await api.patch<PesoResponse>(
				`/pesos/${animalId}/${pesoId}`,
				peso
			);
			console.log(data);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static deletePeso = async (pesoId: string, animalId: string) => {
		try {
			const { data } = await api.delete(
				`/pesos/${animalId}/${pesoId}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
}
