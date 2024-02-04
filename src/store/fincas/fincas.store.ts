import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FincasResponse } from '../../interfaces';
import { FincasService } from '../../services/fincas.service';

export interface FincaState {
	fincas: FincasResponse[];
	isLoading: boolean;
	error: string | null;

	setIsLoading: (value: boolean) => void;
	setError: (value: string | null) => void;
	getFincas: () => Promise<void>;
	createFinca: (finca: FincasResponse) => Promise<FincasResponse>;
}

const storeApi: StateCreator<FincaState> = set => ({
	fincas: [],
	isLoading: false,
	error: null,

	setIsLoading: (value: boolean) => set({ isLoading: value }),
	setError: (value: string | null) => set({ error: value }),

	getFincas: async () => {
		set({ isLoading: true });
		try {
			const data = await FincasService.getFincas();
			set({ fincas: data });
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
});

export const useFincasStore = create<FincaState>()(
	devtools(storeApi)
);
