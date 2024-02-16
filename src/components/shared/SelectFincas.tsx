import { useEffect, useState } from 'react';
import { useFincasStore } from '../../store/fincas/fincas.store';
import { useAuthStore } from '../../store';
import { MdSearch } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa6';
import { FincasResponse } from '../../interfaces';

export const SelectFincas = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchInput, setSearchInput] = useState('');

	const isLoading = useFincasStore(state => state.isLoading);
	const getFincas = useFincasStore(state => state.getFincas);
	const fincas = useFincasStore(state => state.fincas);

	const [selectedItem, setSelectedItem] =
		useState<FincasResponse | null>(fincas[0]);

	const selectedFinca = useAuthStore(state => state.selectedFinca);
	const setSelectedFinca = useAuthStore(
		state => state.setSelectedFinca
	);
	const setFincaId = useAuthStore(state => state.setFincaId);

	const onOptionClicked = (finca: FincasResponse) => () => {
		setSelectedItem(finca);
		setIsOpen(false);
		setFincaId(finca.id);
		setSelectedFinca(finca);
	};

	const toggling = () => setIsOpen(!isOpen);

	const handleSearchInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchInput(e.target.value.trim());
	};

	const getFinca = async () => {
		await getFincas(1, 10, searchInput);
		if (fincas.length > 0) {
			const defaultFinca = fincas[0]; // Tomamos la primera finca como default
			setFincaId(defaultFinca.id);
			setSelectedFinca(defaultFinca);
		}
		// setFincaId(fincas[0].id);
		console.log(selectedFinca);
	};

	useEffect(() => {
		getFinca();
	}, [getFincas]);

	if (isLoading) return <p>cargando...</p>;

	return (
		<div className='w-[300px] mr-5 '>
			<div className='relative '>
				<div className='flex flex-col gap-1'>
					<p className='font-bold text-xs'>Finca seleccionada:</p>
					<div
						className='w-full px-6 py-3 border border-primaryGray rounded-[8px] shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 cursor-pointer flex items-center justify-between no-select'
						onClick={toggling}
					>
						<p className='font-bold text-secondGray'>
							{selectedFinca
								? `${selectedFinca.nombre}`
								: 'Seleccione un finca'}
						</p>
						<div className='pointer-events-none flex items-center justify-center'>
							<FaChevronDown color='#808080' size={15} />
						</div>
					</div>
				</div>
				{isOpen && (
					<div className='absolute w-full bg-white rounded-[8px]  z-10 mt-2 shadow-lg'>
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
						<div className='flex flex-col h-[180px] overflow-y-scroll'>
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
