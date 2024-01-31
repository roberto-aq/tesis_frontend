import { useState } from 'react';
import { SelectList } from '../components';
import { Animal } from '../interfaces';

export const ProduccionPage = () => {
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
