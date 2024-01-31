import { LoaderFunctionArgs } from 'react-router-dom';
import { ReproduccionAnimalService } from '../../services/reproduccionAnimal.service';
import { useAnimalesStore } from '../../store/animales';

export const reproduccionAnimalLoader = async ({
	params,
}: LoaderFunctionArgs) => {
	if (!params.id) return null;
	await useAnimalesStore.getState().getAnimalById(params.id);
	await useAnimalesStore.getState().getEstadosReproductivos();
	const animal = useAnimalesStore.getState().animalById;
	const reproduccionAnimal =
		await ReproduccionAnimalService.getReproduccionAnimalByAnimalId(
			params.id
		);
	return { reproduccion: reproduccionAnimal, info: animal };
};
