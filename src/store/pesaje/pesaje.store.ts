import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PesoResponse } from '../../interfaces';
import { PesajeAnimalService } from '../../services/pesaje.service';

export interface PesajeState {
	pesos: PesoResponse[];
	isLoading: boolean;
	error: string | null;

	setIsLoading: (value: boolean) => void;
	getPesos: (animalId: string) => Promise<void>;
	createPeso: (peso: PesoResponse, animalId: string) => Promise<void>;
	updatePeso: (
		peso: PesoResponse,
		animalId: string,
		pesoId: string
	) => Promise<void>;
	deletePeso: (pesoId: string, animalId: string) => Promise<void>;
}

const storeApi: StateCreator<PesajeState> = set => ({
	pesos: [],
	isLoading: false,
	error: null,

	setIsLoading: (value: boolean) => set({ isLoading: value }),
	getPesos: async (animalId: string) => {
		set({ isLoading: true });
		try {
			const data =
				await PesajeAnimalService.getHistorialPesosByAnimalId(
					animalId
				);
			set({ pesos: data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	createPeso: async (peso: PesoResponse, animalId: string) => {
		set({ isLoading: true });
		try {
			const newPeso = await PesajeAnimalService.createPeso(
				peso,
				animalId
			);
			set(state => ({
				pesos: [...state.pesos, newPeso],
				error: null,
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	updatePeso: async (
		peso: PesoResponse,
		animalId: string,
		pesoId: string
	) => {
		set({ isLoading: true });
		try {
			const updatedPeso = await PesajeAnimalService.updatePeso(
				peso,
				animalId,
				pesoId
			);
			set(state => ({
				pesos: state.pesos.map(peso =>
					peso.id === pesoId ? updatedPeso : peso
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	deletePeso: async (pesoId: string, animalId: string) => {
		set({ isLoading: true });
		try {
			await PesajeAnimalService.deletePeso(pesoId, animalId);
			set(state => ({
				pesos: state.pesos.filter(peso => peso.id !== pesoId),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
});

export const usePesajeStore = create<PesajeState>()(
	devtools(storeApi)
);
