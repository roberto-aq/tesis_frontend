import { api } from '../api/vaquinnova.api';

export class ProduccionService {
	static async getProduccionByAnimal(animalId: string) {
		try {
			const { data } = await api.get(
				`/produccion/animal/${animalId}`
			);
			console.log(data);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}
}
