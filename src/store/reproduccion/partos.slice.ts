import { StateCreator } from 'zustand';
import { Parto } from '../../interfaces';
import { ReproduccionAnimalService } from '../../services/reproduccionAnimal.service';

export interface PartosSlice {
	partos: Parto[];
	parto: Parto;
	isLoading: boolean;
	error: string | null;

	getPartos: (animalId: string) => Promise<void>;
	getPartosById: (animalId: string, partoId: string) => Promise<void>;
	createParto: (animalId: string, parto: Parto) => Promise<void>;
	updateParto: (
		animalId: string,
		partoId: string,
		parto: Parto
	) => Promise<void>;
	deleteParto: (
		animalId: string,
		partoId: string
	) => Promise<boolean>;
}

export const createPartosSlice: StateCreator<PartosSlice> = set => ({
	partos: [],
	parto: {} as Parto,
	isLoading: false,
	error: null,

	getPartos: async animalId => {
		try {
			set({ isLoading: true });

			const data = await ReproduccionAnimalService.getPartos(
				animalId
			);
			set({ partos: data });
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	getPartosById: async (animalId, partoId) => {
		try {
			set({ isLoading: true });

			const data = await ReproduccionAnimalService.getPartosById(
				animalId,
				partoId
			);
			set({ parto: data });
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	createParto: async (animalId, parto) => {
		try {
			set({ isLoading: true });

			const data = await ReproduccionAnimalService.createParto(
				animalId,
				parto
			);
			set(state => ({
				partos: [...state.partos, data],
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	updateParto: async (animalId, partoId, parto) => {
		try {
			set({ isLoading: true });

			const data = await ReproduccionAnimalService.updateParto(
				animalId,
				partoId,
				parto
			);
			set(state => ({
				partos: state.partos.map(parto =>
					parto.id === data.id ? data : parto
				),
				parto: data,
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteParto: async (animalId, partoId) => {
		try {
			set({ isLoading: true });

			await ReproduccionAnimalService.deleteParto(animalId, partoId);
			set(state => ({
				partos: state.partos.filter(parto => parto.id !== partoId),
			}));
			return true;
		} catch (error: any) {
			set({ error });
			return false;
		} finally {
			set({ isLoading: false });
		}
	},
});
