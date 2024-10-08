import { api } from '../api/vaquinnova.api';
import { DescarteResponse } from '../interfaces';

export class DescarteService {
	static async getDescarte(animalId: string) {
		try {
			const { data } = await api.get(`/descarte/${animalId}`);

			return data;
		} catch (error: any) {
			console.log(error.response.data);
			return null;
		}
	}

	static async createDescarte(
		descarte: DescarteResponse,
		animalId: string
	) {
		try {
			const { data } = await api.post(
				`/descarte/${animalId}/new`,
				descarte
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async updateDescarte(
		descarte: DescarteResponse,
		animalId: string,
		id: string
	) {
		try {
			const { data } = await api.patch(
				`/descarte/${animalId}/${id}`,
				descarte
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async deleteDescarte(animalId: string) {
		try {
			const { data } = await api.delete(`/descarte/${animalId}`);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	/* ********************************** */
	/*            CAUSA GENERAL           */
	/* ********************************** */
	static async getCausasGenerales() {
		try {
			const { data } = await api.get('/causas-general-descarte');
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async createCausaGeneral(causaGeneral: any) {
		try {
			const { data } = await api.post(
				'/causas-general-descarte/new',
				causaGeneral
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async updateCausaGeneral(causaGeneral: any, id: string) {
		try {
			const { data } = await api.patch(
				`/causas-general-descarte/${id}`,
				causaGeneral
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async deleteCausaGeneral(id: string) {
		try {
			const { data } = await api.delete(
				`/causas-general-descarte/${id}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	/* ********************************** */
	/*          CAUSA ESPECIFICA          */
	/* ********************************** */
	static async getCausasEspecificas() {
		try {
			const { data } = await api.get('/causas-especificas-descarte');
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async getCausasEspecificasByCausaGeneralId(
		causaGeneralId: string
	) {
		try {
			const { data } = await api.get(
				`/causas-especificas-descarte/causa-general/${causaGeneralId}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async createCausaEspecifica(causaEspecifica: any) {
		try {
			const { data } = await api.post(
				'/causas-especificas-descarte/new',
				causaEspecifica
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async updateCausaEspecifica(
		causaEspecifica: any,
		id: string
	) {
		try {
			const { data } = await api.patch(
				`/causas-especificas-descarte/${id}`,
				causaEspecifica
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}

	static async deleteCausaEspecifica(id: string) {
		try {
			const { data } = await api.delete(
				`/causas-especificas-descarte/${id}`
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}
}
