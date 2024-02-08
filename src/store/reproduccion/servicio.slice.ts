import { StateCreator } from 'zustand';
import { Servicio } from '../../interfaces';
import { ReproduccionAnimalService } from '../../services/reproduccionAnimal.service';

export interface ServiciosSlice {
	servicios: Servicio[];
	servicio: Servicio;
	isLoading: boolean;
	error: string | null;

	getServicios: (animalId: string) => Promise<void>;
	getServiciosById: (
		animalId: string,
		servicioId: string
	) => Promise<void>;
	createServicio: (
		animalId: string,
		servicio: Servicio
	) => Promise<void>;
	updateServicio: (
		animalId: string,
		servicioId: string,
		servicio: Servicio
	) => Promise<void>;
	deleteServicio: (
		animalId: string,
		servicioId: string
	) => Promise<boolean>;
	// Operaciones múltiples
	createMultipleServicios: (
		animalId: string,
		servicios: Servicio[]
	) => Promise<void>;
	updateMultipleServicios: (
		animalId: string,
		servicios: Servicio[]
	) => Promise<void>;
}

export const createServiciosSlice: StateCreator<
	ServiciosSlice
> = set => ({
	servicios: [],
	servicio: {} as Servicio,
	isLoading: false,
	error: null,

	getServicios: async animalId => {
		try {
			set({ isLoading: true });

			const data = await ReproduccionAnimalService.getServicios(
				animalId
			);
			set({ servicios: data });
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	getServiciosById: async (animalId, servicioId) => {
		try {
			set({ isLoading: true });

			const data = await ReproduccionAnimalService.getServiciosById(
				animalId,
				servicioId
			);
			set({ servicio: data });
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	createServicio: async (animalId, servicio) => {
		try {
			set({ isLoading: true });

			const data = await ReproduccionAnimalService.createServicio(
				animalId,
				servicio
			);
			set(state => ({
				servicios: [...state.servicios, data],
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	updateServicio: async (animalId, servicioId, servicio) => {
		try {
			set({ isLoading: true });

			const data = await ReproduccionAnimalService.updateServicio(
				animalId,
				servicioId,
				servicio
			);
			set(state => ({
				servicios: state.servicios.map(servicio =>
					servicio.id === data.id ? data : servicio
				),
				servicio: data,
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteServicio: async (animalId, servicioId) => {
		try {
			set({ isLoading: true });

			await ReproduccionAnimalService.deleteServicio(
				animalId,
				servicioId
			);
			set(state => ({
				servicios: state.servicios.filter(
					servicio => servicio.id !== servicioId
				),
			}));
			return true;
		} catch (error: any) {
			set({ error });
			return false;
		} finally {
			set({ isLoading: false });
		}
	},
	// Operaciones múltiples
	createMultipleServicios: async (animalId, servicios) => {
		try {
			set({ isLoading: true });

			const data =
				await ReproduccionAnimalService.createMultipleServicios(
					animalId,
					servicios
				);
			set(state => ({
				servicios: [...state.servicios, ...data],
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	updateMultipleServicios: async (animalId, servicios) => {
		try {
			set({ isLoading: true });

			const data =
				await ReproduccionAnimalService.updateMultipleServicios(
					animalId,
					servicios
				);
			set(state => ({
				servicios: state.servicios.map(
					servicio =>
						data.find(
							(service: Servicio) => service.id === servicio.id
						) || servicio
				),
			}));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
});
