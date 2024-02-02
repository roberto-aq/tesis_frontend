import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GeneralState {
	isOpenModal: boolean;
	modalError: boolean;
	isLoading: boolean;
	showAlertError: boolean;

	setIsLoading: (value: boolean) => void;
	setIsOpenModal: (value: boolean) => void;
	setModalError: (value: boolean) => void;
	setShowAlertError: (value: boolean) => void;
}

const storeApi: StateCreator<GeneralState> = set => ({
	isOpenModal: false,
	isLoading: false,
	modalError: false,
	showAlertError: true,

	setIsLoading: (value: boolean) => set({ isLoading: value }),

	setIsOpenModal: (value: boolean) => set({ isOpenModal: value }),
	setModalError: (value: boolean) => set({ modalError: value }),
	setShowAlertError: (value: boolean) =>
		set({ showAlertError: value }),
});

export const useGeneralStore = create<GeneralState>()(
	devtools(storeApi)
);
