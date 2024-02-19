import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ProduccionResponse } from '../../interfaces';
import { ProduccionService } from '../../services/produccion.service';

export interface ProduccionState {
	produccionList: ProduccionResponse[];
	produccionListDate: ProduccionResponse[];
	animalesConProduccion: any[];
	isLoading: boolean;
	error: string | null;

	setIsLoading: (value: boolean) => void;
	getProduccionByAnimal: (animalId: string) => Promise<void>;
	createProduccion: (
		produccion: ProduccionResponse,
		animalId: string
	) => Promise<void>;
	updateProduccion: (
		produccion: ProduccionResponse,
		animalId: string,
		id: string
	) => Promise<void>;
	deleteProduccion: (id: string, animalId: string) => Promise<void>;
	getProduccionByDateAndFinca: (
		fecha: string,
		fincaId: string,
		animales: any[]
	) => Promise<void>;
	setAnimalesConProduccion: (animales: any[]) => void;
	createOrUpdateProduccion: (producciones: any) => Promise<void>;
}

const storeApi: StateCreator<ProduccionState> = set => ({
	// Lista de producciones de un animal específico
	produccionList: [],
	// Lista de producciones por fecha de todos los animales
	produccionListDate: [],
	isLoading: false,
	error: null,
	animalesConProduccion: [],

	setIsLoading: (value: boolean) => set({ isLoading: value }),
	getProduccionByAnimal: async (animalId: string) => {
		set({ isLoading: true });
		try {
			const data = await ProduccionService.getProduccionByAnimal(
				animalId
			);
			set({ produccionList: data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
	createProduccion: async (
		produccion: ProduccionResponse,
		animalId: string
	) => {
		set({ isLoading: true });
		try {
			const newProduccion = await ProduccionService.createProduccion(
				produccion,
				animalId
			);
			set(state => ({
				produccionList: [...state.produccionList, newProduccion],
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	updateProduccion: async (
		produccion: ProduccionResponse,
		animalId: string,
		id: string
	) => {
		set({ isLoading: true });
		try {
			const updatedProduccion =
				await ProduccionService.updateProduccion(
					produccion,
					animalId,
					id
				);
			set(state => ({
				produccionList: state.produccionList.map(produccion =>
					produccion.id === id ? updatedProduccion : produccion
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteProduccion: async (id: string, animalId: string) => {
		set({ isLoading: true });
		try {
			await ProduccionService.deleteProduccion(id, animalId);
			set(state => ({
				produccionList: state.produccionList.filter(
					produccion => produccion.id !== id
				),
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	setAnimalesConProduccion: (animales: any[]) => {
		set({ animalesConProduccion: animales });
	},

	getProduccionByDateAndFinca: async (
		fecha: string,
		fincaId: string,
		animales: any[]
	) => {
		set({ isLoading: true, error: null });
		try {
			const data = await ProduccionService.getProduccionByDate(
				fecha,
				fincaId
			);
			const animalesActualizados = animales.map(animal => {
				const produccion = data.find(
					(p: any) => p.animal.id === animal.id
				);
				return { ...animal, produccion: produccion || null };
			});
			set({
				produccionListDate: data,
				animalesConProduccion: animalesActualizados,
			});
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	createOrUpdateProduccion: async (producciones: any) => {
		set({ isLoading: true });
		try {
			const data = await ProduccionService.createOrUpdateProduccion(
				producciones
			);
			set(state => ({
				produccionListDate: [...state.produccionListDate, ...data],
			}));
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
});

export const useProduccionStore = create<ProduccionState>()(
	devtools(storeApi)
);
