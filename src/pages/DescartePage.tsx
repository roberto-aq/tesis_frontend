import { useState } from 'react';
import { Animal } from '../interfaces';
import { SelectList } from '../components';
import { useDescarteStore } from '../store';

export const DescartePage = () => {
	const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(
		null
	);
	const isLoading = useDescarteStore(state => state.isLoading);

	const handleAnimalSelect = (animal: Animal) => {
		setSelectedAnimal(animal);
	};

	return (
		<div className='flex  flex-col gap-6 flex-1'>
			<SelectList
				handleAnimalSelect={handleAnimalSelect}
				isLoading={isLoading}
			/>
		</div>
	);
};
