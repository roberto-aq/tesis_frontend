import { api } from '../api/vaquinnova.api';
import { FincasResponse } from '../interfaces';

export class FincasService {
	static async getFincas() {
		try {
			const { data } = await api.get('finca/admin/fincas');

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
}
