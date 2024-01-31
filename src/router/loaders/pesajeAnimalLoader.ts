import { LoaderFunctionArgs } from 'react-router-dom';
import { useAnimalesStore } from '../../store/animales';
import { usePesajeStore } from '../../store/pesaje/pesaje.store';

export const pesajeAnimalLoader = async ({
	params,
}: LoaderFunctionArgs) => {
	if (!params.id) return null;
	await useAnimalesStore.getState().getAnimalById(params.id);
	await useAnimalesStore.getState().getEstadosReproductivos();
	await usePesajeStore.getState().getPesos(params.id);
	const animal = useAnimalesStore.getState().animalById;

	return { pesaje: {}, animal };
};
