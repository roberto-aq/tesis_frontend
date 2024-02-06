import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FincasResponse } from '../../interfaces';
import { FincasService } from '../../services/fincas.service';

export interface FincaState {
	fincas: FincasResponse[];
	totalFincas: number;
	fincaById: FincasResponse | null;
	isLoading: boolean;
	error: string | null;

	setIsLoading: (value: boolean) => void;
	setError: (value: string | null) => void;
	getFincas: (
		page: number,
		limit: number,
		searchTerm: string
	) => Promise<void>;
	createFinca: (finca: FincasResponse) => Promise<FincasResponse>;
	getFincaById: (id: string) => Promise<void>;
	updateFinca: (
		id: string,
		finca: FincasResponse
	) => Promise<FincasResponse>;
	deleteFinca: (id: string) => Promise<void>;
}

const storeApi: StateCreator<FincaState> = set => ({
	fincas: [],
	totalFincas: 0,
	fincaById: null,
	isLoading: false,
	error: null,

	setIsLoading: (value: boolean) => set({ isLoading: value }),
	setError: (value: string | null) => set({ error: value }),

	getFincas: async (page = 1, limit = 10, searchTerm = '') => {
		set({ isLoading: true });
		try {
			const { fincas, totalFincas } = await FincasService.getFincas(
				page,
				limit,
				searchTerm
			);
			set({ fincas, totalFincas });
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	createFinca: async (finca: FincasResponse) => {
		set({ isLoading: true });
		try {
			const data = await FincasService.createFinca(finca);

			set(state => ({
				fincas: [...state.fincas, data],
			}));

			return data;
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	getFincaById: async (id: string) => {
		set({ isLoading: true });
		try {
			const data = await FincasService.getFincaById(id);
			set({ fincaById: data });
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	updateFinca: async (id: string, finca: FincasResponse) => {
		set({ isLoading: true });
		try {
			const data = await FincasService.updateFinca(id, finca);
			set(state => ({
				fincas: state.fincas.map(finca =>
					finca.id === id ? data : finca
				),
				fincaById: data,
			}));
			return data;
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteFinca: async (id: string) => {
		set({ isLoading: true });
		try {
			await FincasService.deleteFinca(id);
			set(state => ({
				fincas: state.fincas.filter(finca => finca.id !== id),
				fincaById: null,
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
});

export const useFincasStore = create<FincaState>()(
	devtools(storeApi)
);
