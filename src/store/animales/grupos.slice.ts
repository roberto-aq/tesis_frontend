import { StateCreator } from 'zustand';
import { Grupo } from '../../interfaces';
import { AnimalService } from '../../services/animales.service';

export interface GruposSlice {
	grupos: Grupo[];
	isLoading: boolean;
	error: string | null;

	getGrupos: () => Promise<void>;
}

export const createGruposSlice: StateCreator<GruposSlice> = set => ({
	grupos: [],
	isLoading: false,
	error: null,

	getGrupos: async () => {
		try {
			set({ isLoading: true });
			const grupos = await AnimalService.getGrupos();
			set({ grupos });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
});
