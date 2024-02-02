import { StateCreator } from 'zustand';
import { Animal } from '../../interfaces';
import { AnimalService } from '../../services/animales.service';

export interface AnimalesSlice {
	animales: Animal[];
	animalById: Animal;
	totalAnimales: number;
	isLoading: boolean;
	error: string | null;

	getAnimales: (
		fincaId: string,
		page?: number,
		limit?: number,
		searchTerm?: string
	) => Promise<void>;
	getAnimalById: (animalId: string) => Promise<void>;
	createAnimal: (animal: Animal) => Promise<void>;
	updateAnimal: (animal: Animal, animalId: string) => Promise<void>;
	deleteAnimal: (animalId: string) => Promise<boolean>;
}

export const createAnimalesSlice: StateCreator<
	AnimalesSlice
> = set => ({
	animales: [],
	animalById: {} as Animal,
	totalAnimales: 0,

	isLoading: false,
	error: null,

	getAnimales: async (
		fincaId,
		page = 1,
		limit = 10,
		searchTerm = ''
	) => {
		try {
			set({ isLoading: true });

			const { animales, totalAnimales } =
				await AnimalService.getAnimalesByFincaId(
					fincaId,
					page,
					limit,
					searchTerm
				);
			set({ animales, totalAnimales });
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

			const data = await AnimalService.createAnimal(animal);
			set(state => ({ animales: [...state.animales, data] }));
		} catch (error: any) {
			set({ error });
		} finally {
			set({ isLoading: false });
		}
	},
	updateAnimal: async (animal: any, animalId: string) => {
		try {
			set({ isLoading: true });
			const data = await AnimalService.updateAnimal(animal, animalId);

			set(state => ({
				animales: state.animales.map(animal =>
					animal.id === data.id ? data : animal
				),
			}));
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

			set(state => ({
				animales: state.animales.filter(
					animal => animal.id !== animalId
				),
				error: null,
			}));

			return true;
		} catch (error: any) {
			set({ error: error.toString() });
			return false;
		} finally {
			set({ isLoading: false });
		}
	},
});
