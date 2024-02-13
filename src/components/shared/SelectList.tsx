import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { MdSearch } from 'react-icons/md';
import { useAnimalesStore } from '../../store/animales';
import { Animal } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';

interface SelectListProps {
	handleAnimalSelect: (animal: Animal) => void;
}

export const SelectList: React.FC<SelectListProps> = ({
	handleAnimalSelect,
}) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [searchInput, setSearchInput] = useState('');

	const [selectedItem, setSelectedItem] = useState<Animal | null>(
		null
	);

	const animales = useAnimalesStore(state => state.animales);
	const getAnimales = useAnimalesStore(state => state.getAnimales);
	const fincaId = useAuthStore(state => state.fincaId);

	// Manejador para cuando se selecciona una opción personalizada
	const onOptionClicked = (animal: Animal) => () => {
		setSelectedItem(animal);
		setIsOpen(false);
		handleAnimalSelect(animal);
		navigate(`${animal.id}`);
	};

	// Función para alternar la visibilidad del menú desplegable
	const toggling = () => setIsOpen(!isOpen);

	const handleSearchInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchInput(e.target.value.trim());
	};

	useEffect(() => {
		getAnimales(fincaId, 1, 1000, searchInput);
	}, [searchInput]);

	return (
		<div className='w-full  max-w-2xl'>
			<div className='relative'>
				<div
					className='w-full px-6 py-3 bg-white rounded-[8px] shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 cursor-pointer flex items-center justify-between no-select'
					onClick={toggling}
				>
					<p className='font-bold text-secondGray'>
						{selectedItem
							? `${selectedItem} - ${selectedItem.nombre}`
							: 'Seleccione un animal'}
					</p>
					<div className='pointer-events-none flex items-center justify-center'>
						<FaChevronDown color='#808080' size={15} />
					</div>
				</div>
				{isOpen && (
					<div className='absolute w-full bg-white rounded-[8px]  z-10 mt-2 shadow-xl'>
						<div className='flex border-b border-[#BBB] px-4 py-2 gap-4'>
							<MdSearch size={25} color='#BBB' />
							<input
								type='search'
								placeholder='Buscar por número o nombre'
								className=' outline-none  self-stretch w-full'
								value={searchInput}
								onChange={handleSearchInput}
							/>
						</div>
						{animales.length > 0 ? (
							<div className='flex flex-col h-[250px] overflow-y-scroll'>
								{animales.map(animal => (
									<div
										className='px-8 py-5 hover:bg-gray-100 cursor-pointer flex gap-6 items-center'
										onClick={onOptionClicked(animal)}
										key={animal.id}
									>
										<div className='flex w-3 h-3 bg-[#808080] rounded-full'></div>
										<span className='font-bold capitalize text-[#808080]'>
											{animal.numeroIdentificador} - {animal.nombre}
										</span>
									</div>
								))}
							</div>
						) : (
							<div className='flex justify-center items-center h-[100px]'>
								<p className='text-[#808080] font-bold'>
									No hay resultados
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
