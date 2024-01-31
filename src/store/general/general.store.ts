import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GeneralState {
	isOpenModal: boolean;
	isLoading: boolean;

	setIsLoading: (value: boolean) => void;
	setIsOpenModal: (value: boolean) => void;
}

const storeApi: StateCreator<GeneralState> = set => ({
	isOpenModal: false,
	isLoading: false,

	setIsLoading: (value: boolean) => set({ isLoading: value }),

	setIsOpenModal: (value: boolean) => set({ isOpenModal: value }),
});

export const useGeneralStore = create<GeneralState>()(
	devtools(storeApi)
);
