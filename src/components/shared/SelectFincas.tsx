import { useEffect, useState } from 'react';
import { useFincasStore } from '../../store/fincas/fincas.store';
import { useAuthStore } from '../../store';
import { MdSearch } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa6';
import { FincasResponse } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

export const SelectFincas = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [selectedItem, setSelectedItem] =
		useState<FincasResponse | null>(null);

	const getFincas = useFincasStore(state => state.getFincas);
	const fincas = useFincasStore(state => state.fincas);

	const setFincaId = useAuthStore(state => state.setFincaId);

	const [selectedFinca, setSelectedFinca] = useState(
		fincas[0] || null
	);

	const handleFincaSelect = (finca: FincasResponse) => {
		setSelectedFinca(finca);
	};

	const onOptionClicked = (finca: FincasResponse) => () => {
		setSelectedItem(finca);
		setIsOpen(false);
		handleFincaSelect(finca);
		setFincaId(finca.id);
	};

	const toggling = () => setIsOpen(!isOpen);

	const handleSearchInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchInput(e.target.value.trim());
	};

	useEffect(() => {
		getFincas();
		// setFincaId(fincas[0]?.id);
	}, []);

	return (
		<div className='w-full  max-w-2xl mr-5'>
			<div className='relative '>
				<div className='flex flex-col gap-1'>
					<p className='font-bold text-xs'>Finca seleccionada:</p>
					<div
						className='w-full px-6 py-3 border border-primaryGray rounded-[8px] shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 cursor-pointer flex items-center justify-between no-select'
						onClick={toggling}
					>
						<p className='font-bold text-secondGray'>
							{selectedItem
								? `${selectedItem.nombre}`
								: 'Seleccione un finca'}
						</p>
						<div className='pointer-events-none flex items-center justify-center'>
							<FaChevronDown color='#808080' size={15} />
						</div>
					</div>
				</div>
				{isOpen && (
					<div className='absolute w-full bg-white rounded-[8px]  z-10 mt-2'>
						<div className='flex border-b border-[#BBB] px-4 py-2 gap-4'>
							<MdSearch size={25} color='#BBB' />
							<input
								type='search'
								placeholder='Buscar por nombre'
								className=' outline-none  self-stretch w-full'
								value={searchInput}
								onChange={handleSearchInput}
							/>
						</div>
						<div className='flex flex-col h-[250px] overflow-y-scroll'>
							{fincas.map(finca => (
								<div
									className='px-8 py-5 hover:bg-gray-100 cursor-pointer flex gap-6 items-center'
									onClick={onOptionClicked(finca)}
									key={finca.id}
								>
									<div className='flex w-3 h-3 bg-[#808080] rounded-full'></div>
									<span className='font-bold capitalize text-[#808080]'>
										{finca.nombre}
									</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
