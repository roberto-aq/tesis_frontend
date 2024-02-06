import { LoaderFunctionArgs } from 'react-router-dom';
import { useFincasStore } from '../../store/fincas/fincas.store';
import { FincasService } from '../../services/fincas.service';

export const fincasLoader = async ({
	params,
}: LoaderFunctionArgs) => {
	if (!params.id) return null;
	await useFincasStore.getState().getFincaById(params.id);
	const data = await FincasService.getFincaById(params.id);

	return data;
};
