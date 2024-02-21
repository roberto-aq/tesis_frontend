import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Causa, DescarteResponse } from '../../interfaces';
import { DescarteService } from '../../services/descarte.service';

export interface DescarteState {
	descarte: DescarteResponse | null;
	causasGenerales: Causa[];
	causasEspecificasFiltradas: Causa[];
	causasEspecificas: Causa[];
	isLoading: boolean;
	error: string | null;

	setIsLoading: (value: boolean) => void;
	getDescarte: (animalId: string) => Promise<void>;
	createDescarte: (
		animalId: string,
		descarte: DescarteResponse
	) => Promise<void>;
	updateDescarte: (
		descarte: DescarteResponse,
		animalId: string,
		id: string
	) => Promise<void>;
	deleteDescarte: (animalId: string) => Promise<void>;

	getCausasGenerales: () => Promise<void>;
	createCausaGeneral: (causa: Causa) => Promise<void>;
	updateCausaGeneral: (causa: Causa, id: string) => Promise<void>;
	deleteCausaGeneral: (id: string) => Promise<void>;

	// causas específicas
	getCausasEspecificas: () => Promise<void>;
	getCausasEspecificasByCausaGeneralId: (
		causaGeneralId: string
	) => Promise<void>;
	createCausaEspecifica: (causa: Causa) => Promise<void>;
	updateCausaEspecifica: (causa: Causa, id: string) => Promise<void>;
	deleteCausaEspecifica: (id: string) => Promise<void>;
}

const storeApi: StateCreator<DescarteState> = set => ({
	descarte: {} as DescarteResponse,
	causasGenerales: [],
	causasEspecificasFiltradas: [],
	causasEspecificas: [],
	isLoading: false,
	error: null,

	setIsLoading: (value: boolean) => set({ isLoading: value }),
	getDescarte: async (animalId: string) => {
		set({ isLoading: true });
		try {
			const data = await DescarteService.getDescarte(animalId);
			if (data) {
				set({ descarte: data });
			} else {
				set({ descarte: null }); // Manejar el caso de null
			}
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	createDescarte: async (
		animalId: string,
		descarte: DescarteResponse
	) => {
		try {
			const data = await DescarteService.createDescarte(
				descarte,
				animalId
			);
			set({ descarte: data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	updateDescarte: async (
		descarte: DescarteResponse,
		animalId: string,
		id: string
	) => {
		set({ isLoading: true });
		try {
			const data = await DescarteService.updateDescarte(
				descarte,
				animalId,
				id
			);
			set({ descarte: data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteDescarte: async (animalId: string) => {
		set({ isLoading: true });
		try {
			await DescarteService.deleteDescarte(animalId);
			set({ descarte: null });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	// Causas Generales
	getCausasGenerales: async () => {
		try {
			const data = await DescarteService.getCausasGenerales();
			set({ causasGenerales: data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	createCausaGeneral: async (causa: Causa) => {
		try {
			const data = await DescarteService.createCausaGeneral(causa);
			set(state => ({
				causasGenerales: [...state.causasGenerales, data],
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	updateCausaGeneral: async (causa: Causa, id: string) => {
		set({ isLoading: true });
		try {
			const data = await DescarteService.updateCausaGeneral(
				causa,
				id
			);
			set(state => ({
				causasGenerales: state.causasGenerales.map(item =>
					item.id === id ? { ...item, ...data } : item
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	deleteCausaGeneral: async (id: string) => {
		set({ isLoading: true });
		try {
			await DescarteService.deleteCausaGeneral(id);
			set(state => ({
				causasGenerales: state.causasGenerales.filter(
					item => item.id !== id
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	// Causas Específicas
	getCausasEspecificas: async () => {
		try {
			const data = await DescarteService.getCausasEspecificas();
			set({ causasEspecificas: data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	getCausasEspecificasByCausaGeneralId: async (
		causaGeneralId: string
	) => {
		try {
			const data =
				await DescarteService.getCausasEspecificasByCausaGeneralId(
					causaGeneralId
				);
			set({ causasEspecificasFiltradas: data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	createCausaEspecifica: async (causa: Causa) => {
		try {
			const data = await DescarteService.createCausaEspecifica(causa);
			set(state => ({
				causasEspecificas: [...state.causasEspecificas, data],
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	updateCausaEspecifica: async (causa: Causa, id: string) => {
		set({ isLoading: true });
		try {
			const data = await DescarteService.updateCausaEspecifica(
				causa,
				id
			);
			set(state => ({
				causasEspecificas: state.causasEspecificas.map(item =>
					item.id === id ? { ...item, ...data } : item
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	deleteCausaEspecifica: async (id: string) => {
		set({ isLoading: true });
		try {
			await DescarteService.deleteCausaEspecifica(id);
			set(state => ({
				causasEspecificas: state.causasEspecificas.filter(
					item => item.id !== id
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
});

export const useDescarteStore = create<DescarteState>()(
	devtools(storeApi)
);
