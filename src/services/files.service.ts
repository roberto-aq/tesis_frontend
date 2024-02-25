import { api } from '../api/vaquinnova.api';

export class FilesService {
	static async uploadFile(file: any) {
		try {
			// ! Falta implementar el módulo para añadir el animal. En el backend si está implementado. Se necesita consumirlo y mezclarlo con el formulario AddAnimal.tsx
		} catch (error: any) {}
	}

	static getFileAnimal = async (animalId: string) => {
		try {
			const res = await api.get(`/files/animal/${animalId}`, {
				responseType: 'blob',
			});

			const imageUrl = URL.createObjectURL(res.data);
			return imageUrl;
		} catch (error: any) {}
	};
}
