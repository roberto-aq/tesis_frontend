import { StateCreator } from 'zustand';
import { Raza } from '../../interfaces';
import { AnimalService } from '../../services/animales.service';

export interface RazasSlice {
	razas: Raza[];
	isLoading: boolean;
	error: string | null;

	getRazas: () => Promise<void>;
	createRaza: (raza: Raza) => Promise<void>;
	updateRaza: (raza: Raza, id: string) => Promise<void>;
	deleteRaza: (id: string) => Promise<void>;
}

export const createRazasSlice: StateCreator<RazasSlice> = set => ({
	razas: [],
	isLoading: false,
	error: null,

	getRazas: async () => {
		try {
			set({ isLoading: true });
			const razas = await AnimalService.getRazas();
			set({ razas });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	createRaza: async raza => {
		try {
			set({ isLoading: true });
			const data = await AnimalService.createRaza(raza);
			set(state => ({ razas: [...state.razas, data] }));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	updateRaza: async (raza, id) => {
		try {
			set({ isLoading: true });
			const data = await AnimalService.updateRaza(raza, id);
			set(state => ({
				razas: state.razas.map(r => (r.id === id ? data : r)),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteRaza: async id => {
		try {
			set({ isLoading: true });
			await AnimalService.deleteRaza(id);
			set(state => ({
				razas: state.razas.filter(r => r.id !== id),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
});
