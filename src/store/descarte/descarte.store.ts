import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Causa, DescarteResponse } from '../../interfaces';
import { PesajeAnimalService } from '../../services/pesaje.service';
import { DescarteService } from '../../services/descarte.service';

export interface DescarteState {
	descarte: DescarteResponse | null;
	causasGenerales: Causa[];
	causasEspecificasFiltradas: Causa[];
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
	getCausasEspecificasByCausaGeneralId: (
		causaGeneralId: string
	) => Promise<void>;
}

const storeApi: StateCreator<DescarteState> = set => ({
	descarte: {} as DescarteResponse,
	causasGenerales: [],
	causasEspecificasFiltradas: [],
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
	// Causas Específicas
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
});

export const useDescarteStore = create<DescarteState>()(
	devtools(storeApi)
);
