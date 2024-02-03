import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FincasResponse } from '../../interfaces';

export interface FincaState {
	fincas: FincasResponse[];
	isLoading: boolean;
	error: string | null;

	setIsLoading: (value: boolean) => void;
	setError: (value: string | null) => void;
	getFincas: () => Promise<void>;
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
			const response = await fetch('http://localhost:3000/fincas');
			const data = await response.json();
			set({ fincas: data });
		} catch (error: any) {
			set({ error });
			console.error(error);
		} finally {
			set({ isLoading: false });
		}
	},
});

export const useFincasStore = create<FincaState>()(
	devtools(storeApi)
);
