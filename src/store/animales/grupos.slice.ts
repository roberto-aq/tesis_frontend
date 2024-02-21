import { StateCreator } from 'zustand';
import { Grupo } from '../../interfaces';
import { AnimalService } from '../../services/animales.service';

export interface GruposSlice {
	grupos: Grupo[];
	isLoading: boolean;
	error: string | null;

	getGrupos: () => Promise<void>;
	createGrupo: (grupo: Grupo) => Promise<void>;
	updateGrupo: (grupo: Grupo, id: string) => Promise<void>;
	deleteGrupo: (id: string) => Promise<void>;
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

	createGrupo: async grupo => {
		try {
			set({ isLoading: true });
			const newGrupo = await AnimalService.createGrupo(grupo);
			set(state => ({ grupos: [...state.grupos, newGrupo] }));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	updateGrupo: async (grupo, id) => {
		try {
			set({ isLoading: true });
			const updatedGrupo = await AnimalService.updateGrupo(grupo, id);
			set(state => ({
				grupos: state.grupos.map(grupo =>
					grupo.id === updatedGrupo._id ? updatedGrupo : grupo
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteGrupo: async id => {
		try {
			set({ isLoading: true });
			await AnimalService.deleteGrupo(id);
			set(state => ({
				grupos: state.grupos.filter(grupo => grupo.id !== id),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
});
