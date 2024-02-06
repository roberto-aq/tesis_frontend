import { MdSearch } from 'react-icons/md';
import { FincasTableList } from './FincasTableList';
import { LuFilter } from 'react-icons/lu';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { useFincasStore } from '../../store/fincas/fincas.store';

export const TabFincasList = () => {
	const [page, setPage] = useState(1);
	const [searchInput, setSearchInput] = useState('');
	const limit = 10;

	const getFincas = useFincasStore(state => state.getFincas);
	const fincas = useFincasStore(state => state.fincas);
	const totalFincas = useFincasStore(state => state.totalFincas);

	useEffect(() => {
		getFincas(page, limit, searchInput);
	}, [page, fincas.length, searchInput]);

	// Métodos Paginación
	const handleNextPage = () => {
		setPage(page + 1);
	};

	const handlePrevPage = () => {
		if (page > 1) setPage(page - 1);
	};

	const handleSearchInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newSearchTerm = e.target.value.trim();
		setSearchInput(newSearchTerm);
	};

	return (
		<div className='flex flex-col gap-8 p-5'>
			<div className='flex w-full justify-between items-center mt-3 '>
				<div className='flex gap-3 flex-1 '>
					<div className='flex border border-[#BBB] items-center px-4 gap-4 rounded-[5px] w-[40%]'>
						<MdSearch size={25} color='#BBB' />
						<input
							type='search'
							placeholder='buscar por nombre o por propietario'
							className='capitalize outline-none  self-stretch w-full'
							value={searchInput}
							onChange={handleSearchInput}
						/>
					</div>
					<button className='flex items-center justify-center border border-[#BBB] rounded-[5px] w-[48px] h-[48px]'>
						<LuFilter size={25} color='#BBB' />
					</button>
				</div>
				<div className='flex items-center gap-7'>
					<span className='font-bold text-secondGray'>
						{page} de {Math.ceil(totalFincas / limit) || 1}
					</span>
					{/* PAGINACIÓN */}
					<div className='flex gap-4 items-center'>
						<button
							className='border-2 border-secondaryGreen w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handlePrevPage}
							disabled={page === 1}
						>
							<FaChevronLeft
								size={15}
								className='text-secondaryGreen'
							/>
						</button>
						<button
							className='border-2 border-secondaryGreen w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleNextPage}
							disabled={
								page === Math.ceil(totalFincas / limit) ||
								totalFincas === 0
							}
						>
							<FaChevronRight
								size={15}
								className='text-secondaryGreen'
							/>
						</button>
					</div>
				</div>
			</div>

			<FincasTableList />
		</div>
	);
};
