import { useState } from 'react';
import { SelectList } from '../components/shared/SelectList';
import { Animal } from '../interfaces';
import { useReproduccionStore } from '../store/reproduccion';

export const ReproduccionPage = () => {
	const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(
		null
	);

	const handleAnimalSelect = (animal: Animal) => {
		setSelectedAnimal(animal);
	};

	return (
		<div className='flex  flex-col gap-6 flex-1'>
			<SelectList handleAnimalSelect={handleAnimalSelect} />
		</div>
	);
};
