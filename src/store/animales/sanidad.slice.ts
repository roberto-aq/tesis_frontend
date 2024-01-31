import { StateCreator } from 'zustand';
import { AnimalService } from '../../services/animales.service';
import { Sanidad } from '../../interfaces';

export interface SanidadSlice {
	sanidad: Sanidad[];
	sanidadById: Sanidad;
	isLoading: boolean;
	error: string | null;

	getSanidad: (animalId: string) => Promise<void>;
	getSanidadById: (id: string, animalId: string) => Promise<void>;
	createSanidad: (
		sanidad: Sanidad,
		animalId: string
	) => Promise<void>;
	updateSanidad: (
		sanidad: Sanidad,
		animalId: string,
		id: string
	) => Promise<void>;
	deleteSanidad: (id: string, animalId: string) => Promise<void>;
}

export const createSanidadSlice: StateCreator<
	SanidadSlice
> = set => ({
	sanidad: [],
	sanidadById: {} as Sanidad,

	isLoading: false,
	error: null,

	getSanidad: async (animalId: string) => {
		try {
			set({ isLoading: true });

			const data = await AnimalService.getSanidad(animalId);
			set({ sanidad: data });
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	getSanidadById: async (id: string, animalId: string) => {
		try {
			set({ isLoading: true });

			const { data } = await AnimalService.getSanidadById(
				id,
				animalId
			);
			set({ sanidadById: data });
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
	createSanidad: async (sanidad, animalId) => {
		try {
			set({ isLoading: true });

			const newSanidad = await AnimalService.createSanidad(
				sanidad,
				animalId
			);
			set(state => ({
				sanidad: [...state.sanidad, newSanidad],
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
	updateSanidad: async (sanidad, animalId, id) => {
		try {
			set({ isLoading: true });

			const updateSanidad = await AnimalService.updateSanidad(
				sanidad,
				animalId,
				id
			);
			set(state => ({
				sanidad: state.sanidad.map(item =>
					item.id === id ? updateSanidad : item
				),
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
	deleteSanidad: async (id: string, animalId: string) => {
		try {
			set({ isLoading: true });

			await AnimalService.deleteSanidad(id, animalId);

			set(state => ({
				sanidad: state.sanidad.filter(sanidad => sanidad.id !== id),
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
});
