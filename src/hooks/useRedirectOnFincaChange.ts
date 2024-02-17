import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimalesStore } from '../store/animales';
import { Animal } from '../interfaces';

export const useRedirectOnFincaChange = (
	redirectPath: string,
	animalInfo: Animal
) => {
	const navigate = useNavigate();
	const animales = useAnimalesStore(state => state.animales);

	useEffect(() => {
		// Asegúrate de que animalInfo y animales estén definidos antes de hacer la comprobación
		if (animalInfo) {
			const animalPerteneceAFinca = animales.some(
				animal => animal.id === animalInfo.id
			);
			if (!animalPerteneceAFinca) {
				navigate(redirectPath, { replace: true });
			}
		}
	}, [animalInfo, animales, navigate, redirectPath]);
};
