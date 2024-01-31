import { LoaderFunctionArgs } from 'react-router-dom';
import { useAnimalesStore } from '../../store/animales';
import { useProduccionStore } from '../../store/produccion/produccion.store';

export const produccionAnimalLoader = async ({
	params,
}: LoaderFunctionArgs) => {
	if (!params.id) return null;
	await useAnimalesStore.getState().getAnimalById(params.id);
	await useProduccionStore
		.getState()
		.getProduccionByAnimal(params.id);
	const animal = useAnimalesStore.getState().animalById;

	return { animal };
};
