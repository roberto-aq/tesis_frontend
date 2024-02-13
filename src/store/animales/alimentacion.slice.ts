import { StateCreator } from 'zustand';
import { Alimentacion } from '../../interfaces';
import { AnimalService } from '../../services/animales.service';

export interface AlimentacionSlice {
	alimentacion: Alimentacion[];
	alimentacionById: Alimentacion;
	isLoading: boolean;
	error: string | null;

	getAlimentacion: (animalId: string) => Promise<void>;
	getAlimentacionById: (
		id: string,
		animalId: string
	) => Promise<void>;
	createAlimentacion: (
		alimentacion: Alimentacion,
		animalId: string
	) => Promise<void>;
	updateAlimentacion: (
		alimentacion: Alimentacion,
		animalId: string,
		id: string
	) => Promise<void>;
	deleteAlimentacion: (id: string, animalId: string) => Promise<void>;
}

export const createAlimentacionSlice: StateCreator<
	AlimentacionSlice
> = set => ({
	alimentacion: [],
	alimentacionById: {} as Alimentacion,

	isLoading: false,
	error: null,

	getAlimentacion: async (animalId: string) => {
		try {
			set({ isLoading: true });

			const data = await AnimalService.getAlimentacionByAnimal(
				animalId
			);
			set({ alimentacion: data });
			return data;
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	getAlimentacionById: async (id: string, animalId: string) => {
		try {
			set({ isLoading: true });

			const data = await AnimalService.getAlimentacionById(
				id,
				animalId
			);
			set({ alimentacionById: data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	createAlimentacion: async (alimentacion, animalId) => {
		try {
			set({ isLoading: true });

			const newAlimentacion = await AnimalService.createAlimentacion(
				alimentacion,
				animalId
			);
			set(state => ({
				alimentacion: [...state.alimentacion, newAlimentacion],
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	updateAlimentacion: async (
		alimentacion: Alimentacion,
		animalId: string,
		id: string
	) => {
		try {
			set({ isLoading: true });

			const updatedAlimentacion =
				await AnimalService.updateAlimentacion(
					alimentacion,
					animalId,
					id
				);
			set(state => ({
				alimentacion: state.alimentacion.map(item =>
					item.id === id ? updatedAlimentacion : item
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	deleteAlimentacion: async (id: string, animalId: string) => {
		try {
			set({ isLoading: true });

			await AnimalService.deleteAlimentacion(id, animalId);

			set(state => ({
				alimentacion: state.alimentacion.filter(
					alimentacion => alimentacion.id !== id
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
});
