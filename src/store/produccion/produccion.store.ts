import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ProduccionResponse } from '../../interfaces';
import { PesajeAnimalService } from '../../services/pesaje.service';
import { ProduccionService } from '../../services/produccion.service';

export interface ProduccionState {
	produccionList: ProduccionResponse[];
	isLoading: boolean;
	error: string | null;

	setIsLoading: (value: boolean) => void;
	getProduccionByAnimal: (animalId: string) => Promise<void>;
	createPeso: (
		produccion: ProduccionResponse,
		animalId: string
	) => Promise<void>;
	updatePeso: (
		produccion: ProduccionResponse,
		animalId: string,
		id: string
	) => Promise<void>;
	deletePeso: (id: string, animalId: string) => Promise<void>;
}

const storeApi: StateCreator<ProduccionState> = set => ({
	produccionList: [],
	isLoading: false,
	error: null,

	setIsLoading: (value: boolean) => set({ isLoading: value }),
	getProduccionByAnimal: async (animalId: string) => {
		set({ isLoading: true });
		try {
			const data = await ProduccionService.getProduccionByAnimal(
				animalId
			);
			set({ produccionList: data });
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error.response.data.message);
		} finally {
			set({ isLoading: false });
		}
	},
	createPeso: async (
		produccion: ProduccionResponse,
		animalId: string
	) => {
		set({ isLoading: true });
		try {
			const newPeso = await PesajeAnimalService.createPeso(
				produccion,
				animalId
			);
			set(state => ({
				produccionList: [...state.produccionList, newPeso],
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	updatePeso: async (
		produccion: ProduccionResponse,
		animalId: string,
		id: string
	) => {
		set({ isLoading: true });
		try {
			const updatedPeso = await PesajeAnimalService.updatePeso(
				produccion,
				animalId,
				id
			);
			set(state => ({
				produccionList: state.produccionList.map(produccion =>
					produccion.id === id ? updatedPeso : produccion
				),
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	deletePeso: async (id: string, animalId: string) => {
		set({ isLoading: true });
		try {
			await PesajeAnimalService.deletePeso(id, animalId);
			set(state => ({
				produccionList: state.produccionList.filter(produccion => produccion.id !== id),
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
});

export const useProduccionStore = create<ProduccionState>()(
	devtools(storeApi)
);
