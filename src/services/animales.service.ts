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

	static createRaza = async (raza: any) => {
		try {
			const { data } = await api.post('/animales/razas/new', raza);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static updateRaza = async (raza: any, razaId: string) => {
		try {
			const { data } = await api.patch(
				`/animales/razas/${razaId}`,
				raza
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static deleteRaza = async (razaId: string) => {
		try {
			const { data } = await api.delete(`/animales/razas/${razaId}`);
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

	static createEstadoReproductivo = async (estado: any) => {
		try {
			const { data } = await api.post(
				'/animales/estado-reproductivo/new',
				estado
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static updateEstadoReproductivo = async (
		estado: any,
		estadoId: number
	) => {
		try {
			const { data } = await api.patch(
				`/animales/estado-reproductivo/${estadoId}`,
				estado
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static deleteEstadoReproductivo = async (estadoId: number) => {
		try {
			const { data } = await api.delete(
				`/animales/estado-reproductivo/${estadoId}`
			);
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

	static createGrupo = async (grupo: any) => {
		try {
			const { data } = await api.post('/animales/grupos/new', grupo);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static updateGrupo = async (grupo: any, grupoId: string) => {
		try {
			const { data } = await api.patch(
				`/animales/grupos/${grupoId}`,
				grupo
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static deleteGrupo = async (grupoId: string) => {
		try {
			const { data } = await api.delete(
				`/animales/grupos/${grupoId}`
			);
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
