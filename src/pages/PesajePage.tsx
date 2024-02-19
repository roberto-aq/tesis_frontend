import { useState } from 'react';
import { Animal } from '../interfaces';
import { SelectList } from '../components';
import { usePesajeStore } from '../store';

export const PesajePage = () => {
	const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(
		null
	);

	const handleAnimalSelect = (animal: Animal) => {
		setSelectedAnimal(animal);
	};
	const isLoading = usePesajeStore(state => state.isLoading);

	return (
		<div className='flex  flex-col gap-6 flex-1'>
			<SelectList
				handleAnimalSelect={handleAnimalSelect}
				isLoading={isLoading}
			/>
		</div>
	);
};
