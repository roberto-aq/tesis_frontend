import { LoaderFunctionArgs } from 'react-router-dom';
import { AnimalService } from '../../services/animales.service';
import { useAnimalesStore } from '../../store/animales';
import { AnimalLoader } from '../../interfaces';

export const animalesLoader = async ({
	params,
}: LoaderFunctionArgs): Promise<AnimalLoader | null> => {
	if (!params.id) return null;
	const animal = await AnimalService.getAnimalById(params.id);
	await useAnimalesStore.getState().getAnimalById(params.id);
	// const alimentacion = await AnimalService.getAlimentacionByAnimal(
	// 	params.id
	// );
	await useAnimalesStore.getState().getAlimentacion(params.id);

	await useAnimalesStore.getState().getSanidad(params.id);

	return {
		animalInfo: animal,
	};
};
