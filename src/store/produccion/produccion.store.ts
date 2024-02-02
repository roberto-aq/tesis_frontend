import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ProduccionResponse } from '../../interfaces';
import { ProduccionService } from '../../services/produccion.service';

export interface ProduccionState {
	produccionList: ProduccionResponse[];
	isLoading: boolean;
	error: string | null;

	setIsLoading: (value: boolean) => void;
	getProduccionByAnimal: (animalId: string) => Promise<void>;
	createProduccion: (
		produccion: ProduccionResponse,
		animalId: string
	) => Promise<void>;
	updateProduccion: (
		produccion: ProduccionResponse,
		animalId: string,
		id: string
	) => Promise<void>;
	deleteProduccion: (id: string, animalId: string) => Promise<void>;
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
	createProduccion: async (
		produccion: ProduccionResponse,
		animalId: string
	) => {
		set({ isLoading: true });
		try {
			const newProduccion = await ProduccionService.createProduccion(
				produccion,
				animalId
			);
			set(state => ({
				produccionList: [...state.produccionList, newProduccion],
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	updateProduccion: async (
		produccion: ProduccionResponse,
		animalId: string,
		id: string
	) => {
		set({ isLoading: true });
		try {
			const updatedProduccion =
				await ProduccionService.updateProduccion(
					produccion,
					animalId,
					id
				);
			set(state => ({
				produccionList: state.produccionList.map(produccion =>
					produccion.id === id ? updatedProduccion : produccion
				),
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteProduccion: async (id: string, animalId: string) => {
		set({ isLoading: true });
		try {
			await ProduccionService.deleteProduccion(id, animalId);
			set(state => ({
				produccionList: state.produccionList.filter(
					produccion => produccion.id !== id
				),
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
