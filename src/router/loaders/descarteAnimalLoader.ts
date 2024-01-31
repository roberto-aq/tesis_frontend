import { LoaderFunctionArgs } from 'react-router-dom';
import { useAnimalesStore } from '../../store/animales';
import { useDescarteStore } from '../../store';

export const descarteAnimalLoader = async ({
	params,
}: LoaderFunctionArgs) => {
	if (!params.id) return null;
	await useAnimalesStore.getState().getAnimalById(params.id);
	await useAnimalesStore.getState().getEstadosReproductivos();
	await useDescarteStore.getState().getDescarte(params.id);
	const animal = useAnimalesStore.getState().animalById;

	return { animal };
};
