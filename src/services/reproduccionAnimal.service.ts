import { api } from '../api/vaquinnova.api';
import { ReproduccionAnimalResponse } from '../interfaces';

export class ReproduccionAnimalService {
	static getReproduccionAnimalByAnimalId = async (
		animalId: string
	) => {
		try {
			const { data } = await api.get<ReproduccionAnimalResponse[]>(
				`/reproduccion/animal/${animalId}`
			);
			console.log(data);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
}
