import { StateCreator } from 'zustand';
import { Raza } from '../../interfaces';
import { AnimalService } from '../../services/animales.service';

export interface RazasSlice {
	razas: Raza[];
	isLoading: boolean;
	error: string | null;

	getRazas: () => Promise<void>;
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
});
