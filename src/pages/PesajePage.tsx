import { useState } from 'react';
import { Animal } from '../interfaces';
import { SelectList } from '../components';

export const PesajePage = () => {
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
