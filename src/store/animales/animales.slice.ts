import { StateCreator } from 'zustand';
import { Animal } from '../../interfaces';
import { AnimalService } from '../../services/animales.service';

export interface AnimalesSlice {
	animales: Animal[];
	animalById: Animal;
	isLoading: boolean;
	error: string | null;

	getAnimales: (fincaId: string) => Promise<void>;
	getAnimalById: (animalId: string) => Promise<void>;
	createAnimal: (animal: Animal) => Promise<void>;
	updateAnimal: (animal: Animal, animalId: string) => Promise<void>;
	deleteAnimal: (animalId: string) => Promise<void>;
}

export const createAnimalesSlice: StateCreator<
	AnimalesSlice
> = set => ({
	animales: [],
	animalById: {} as Animal,

	isLoading: false,
	error: null,

	getAnimales: async fincaId => {
		try {
			set({ isLoading: true });

			const data = await AnimalService.getAnimalesByFincaId(fincaId);
			set({ animales: data });
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},

	getAnimalById: async animalId => {
		try {
			set({ isLoading: true });

			const data = await AnimalService.getAnimalById(animalId);
			set({ animalById: data });
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
	createAnimal: async animal => {
		try {
			set({ isLoading: true });

			await AnimalService.createAnimal(animal);
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
	updateAnimal: async (animal: any, animalId: string) => {
		try {
			set({ isLoading: true });
			await AnimalService.updateAnimal(animal, animalId);
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
	deleteAnimal: async (animalId: string) => {
		try {
			set({ isLoading: true });
			await AnimalService.deleteAnimal(animalId);
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
});
