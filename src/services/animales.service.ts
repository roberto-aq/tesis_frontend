import { api } from '../api/vaquinnova.api';
import { Animal, Sanidad } from '../interfaces';

export class AnimalService {
	/* ********************************** */
	/*              ANIMALES              */
	/* ********************************** */
	static getAnimalesByFincaId = async (
		fincaId: string,
		page: number,
		limit: number,
		searchTerm: string
	) => {
		try {
			const { data } = await api.get(
				`/animal/finca/${fincaId}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`
			);

			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static getAnimalById = async (animalId: string) => {
		try {
			const { data } = await api.get<Animal>(`/animal/${animalId}`);

			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static createAnimal = async (animal: any) => {
		try {
			const { data } = await api.post('/animal/new', animal);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static updateAnimal = async (animal: any, animalId: string) => {
		try {
			const { data } = await api.patch(`/animal/${animalId}`, animal);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
	static deleteAnimal = async (animalId: string) => {
		try {
			const { data } = await api.delete(`/animal/${animalId}`);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	/* ********************************** */
	/*                RAZAS               */
	/* ********************************** */
	static getRazas = async () => {
		try {
			const { data } = await api.get('/animales/razas');
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	/* ********************************** */
	/*        ESTADOS REPRODUCTIVOS       */
	/* ********************************** */
	static getEstadosReproductivos = async () => {
		try {
			const { data } = await api.get('/animales/estado-reproductivo');
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	/* ********************************** */
	/*               GRUPOS               */
	/* ********************************** */
	static getGrupos = async () => {
		try {
			const { data } = await api.get('/animales/grupos');
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	/* ********************************** */
	/*               SANIDAD              */
	/* ********************************** */
	static getSanidad = async (animalId: string) => {
		try {
			const { data } = await api.get(
				`/sanidad/${animalId}/observaciones`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static getSanidadById = async (id: string, animalId: string) => {
		try {
			const data = await api.get(
				`/sanidad/${animalId}/observaciones/${id}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
	static createSanidad = async (
		sanidad: Sanidad,
		animalId: string
	) => {
		try {
			const { data } = await api.post(
				`/sanidad/${animalId}/observaciones/new`,
				sanidad
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
	static updateSanidad = async (
		updateSanidad: Sanidad,
		animalId: string,
		id: string
	) => {
		try {
			const { data } = await api.patch(
				`/sanidad/${animalId}/observaciones/${id}`,
				updateSanidad
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
	static deleteSanidad = async (id: string, animalId: string) => {
		try {
			const { data } = await api.delete(
				`/sanidad/${animalId}/observaciones/${id}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
	/* ********************************** */
	/*            ALIMENTACIÓN            */
	/* ********************************** */
	static getAlimentacionByAnimal = async (animalId: string) => {
		try {
			const { data } = await api.get(`/alimentacion/${animalId}`);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static getAlimentacionById = async (
		id: string,
		animalId: string
	) => {
		try {
			const { data } = await api.get(
				`/alimentacion/${animalId}/${id}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
	static createAlimentacion = async (
		alimentacion: any,
		animalId: string
	) => {
		try {
			const { data } = await api.post(
				`/alimentacion/${animalId}/new`,
				alimentacion
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
	static updateAlimentacion = async (
		updateAlimentacion: any,
		animalId: string,
		id: string
	) => {
		try {
			const { data } = await api.patch(
				`/alimentacion/${animalId}/${id}`,
				updateAlimentacion
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
	static deleteAlimentacion = async (
		id: string,
		animalId: string
	) => {
		try {
			const { data } = await api.delete(
				`/alimentacion/${animalId}/${id}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
}
