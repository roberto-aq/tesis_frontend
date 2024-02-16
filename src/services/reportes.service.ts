import { api } from '../api/vaquinnova.api';

export class ReportesServie {
	static async getReporteAnimales(fincaId: string) {
		try {
			const { data } = await api.get(
				`/reportes/reporte-animales/${fincaId}`,
				{
					responseType: 'blob',
				}
			);
			return data;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		}
	}
}
