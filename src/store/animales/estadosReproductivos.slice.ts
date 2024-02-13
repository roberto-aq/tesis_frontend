import { StateCreator } from 'zustand';
import { EstadoReproductivo } from '../../interfaces';
import { AnimalService } from '../../services/animales.service';

export interface estadosReproductivosSlice {
	estadosReproductivos: EstadoReproductivo[];
	isLoading: boolean;
	error: string | null;

	getEstadosReproductivos: () => Promise<void>;
}

export const createEstadosReproductivosSlice: StateCreator<
	estadosReproductivosSlice
> = set => ({
	estadosReproductivos: [],
	isLoading: false,
	error: null,

	getEstadosReproductivos: async () => {
		try {
			set({ isLoading: true });

			const estadosReproductivos =
				await AnimalService.getEstadosReproductivos();
			set({ estadosReproductivos });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
});
