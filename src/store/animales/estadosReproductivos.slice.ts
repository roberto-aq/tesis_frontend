import { StateCreator } from 'zustand';
import { EstadoReproductivo } from '../../interfaces';
import { AnimalService } from '../../services/animales.service';

export interface estadosReproductivosSlice {
	estadosReproductivos: EstadoReproductivo[];
	isLoading: boolean;
	error: string | null;

	getEstadosReproductivos: () => Promise<void>;
	createEstadoReproductivo: (
		estadoReproductivo: EstadoReproductivo
	) => Promise<void>;
	updateEstadoReproductivo: (
		estadoReproductivo: EstadoReproductivo,
		id: number
	) => Promise<void>;
	deleteEstadoReproductivo: (id: number) => Promise<void>;
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

	createEstadoReproductivo: async (
		estadoReproductivo: EstadoReproductivo
	) => {
		try {
			set({ isLoading: true });

			const data = await AnimalService.createEstadoReproductivo(
				estadoReproductivo
			);
			set((state: any) => ({
				estadosReproductivos: [...state.estadosReproductivos, data],
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	updateEstadoReproductivo: async (estadoReproductivo, id) => {
		try {
			set({ isLoading: true });
			const updatedEstadoReproductivo =
				await AnimalService.updateEstadoReproductivo(
					estadoReproductivo,
					id
				);
			set(state => ({
				estadosReproductivos: state.estadosReproductivos.map(
					estadoReproductivo =>
						estadoReproductivo.id === updatedEstadoReproductivo._id
							? updatedEstadoReproductivo
							: estadoReproductivo
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteEstadoReproductivo: async id => {
		try {
			set({ isLoading: true });
			await AnimalService.deleteEstadoReproductivo(id);
			set(state => ({
				estadosReproductivos: state.estadosReproductivos.filter(
					estadoReproductivo => estadoReproductivo.id !== id
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
});
