import { api } from '../api/vaquinnova.api';
import {
	Parto,
	ReproduccionAnimalResponse,
	Servicio,
} from '../interfaces';

export class ReproduccionAnimalService {
	static getReproduccionAnimalByAnimalId = async (
		animalId: string
	) => {
		try {
			const { data } = await api.get<ReproduccionAnimalResponse[]>(
				`/reproduccion/animal/${animalId}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	/* ********************************** */
	/*               PARTOS               */
	/* ********************************** */
	static getPartos = async (animalId: string) => {
		try {
			const { data } = await api.get<Parto[]>(`/partos/${animalId}`);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static getPartosById = async (
		animalId: string,
		partoId: string
	) => {
		try {
			const { data } = await api.get<Parto>(
				`/partos/${animalId}/${partoId}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static createParto = async (animalId: string, parto: Parto) => {
		try {
			const { data } = await api.post(
				`/partos/${animalId}/new`,
				parto
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static updateParto = async (
		animalId: string,
		partoId: string,
		parto: Parto
	) => {
		try {
			const { data } = await api.patch(
				`/partos/${animalId}/${partoId}`,
				parto
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static deleteParto = async (animalId: string, partoId: string) => {
		try {
			const { data } = await api.delete(
				`/partos/${animalId}/${partoId}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static async createMultiplePartos(
		animalId: string,
		partos: Parto[]
	) {
		try {
			const { data } = await api.post(
				`/partos/${animalId}/multiple`,
				partos
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async updateMultiplePartos(
		animalId: string,
		partos: Parto[]
	) {
		try {
			const { data } = await api.patch(
				`/partos/${animalId}/update-multiple`,
				partos
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	/* ********************************** */
	/*              SERVICIOS             */
	/* ********************************** */
	static getServicios = async (animalId: string) => {
		try {
			const { data } = await api.get<Servicio[]>(
				`/servicios/${animalId}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static getServiciosById = async (
		animalId: string,
		servicioId: string
	) => {
		try {
			const { data } = await api.get<Servicio>(
				`/servicios/${animalId}/${servicioId}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static createServicio = async (
		animalId: string,
		servicio: Servicio
	) => {
		try {
			const { data } = await api.post(
				`/servicios/${animalId}/new`,
				servicio
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static updateServicio = async (
		animalId: string,
		servicioId: string,
		servicio: Servicio
	) => {
		try {
			const { data } = await api.patch(
				`/servicios/${animalId}/${servicioId}`,
				servicio
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static deleteServicio = async (
		animalId: string,
		servicioId: string
	) => {
		try {
			const { data } = await api.delete(
				`/servicios/${animalId}/${servicioId}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static createMultipleServicios = async (
		animalId: string,
		servicios: Servicio[]
	) => {
		try {
			const { data } = await api.post(
				`/servicios/${animalId}/multiple`,
				servicios
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};

	static updateMultipleServicios = async (
		animalId: string,
		servicios: Servicio[]
	) => {
		try {
			const { data } = await api.patch(
				`/servicios/${animalId}/update-multiple`,
				servicios
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	};
}
