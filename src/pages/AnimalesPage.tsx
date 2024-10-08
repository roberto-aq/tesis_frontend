import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import { LuFilter } from 'react-icons/lu';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import { RiFileExcel2Fill } from 'react-icons/ri';
import {
	AddAnimal,
	AnimalesTableList,
	ButtonModal,
	ModalForm,
} from '../components';
import { useAuthStore, useGeneralStore } from '../store';
import { useAnimalesStore } from '../store/animales';
import { ReportesServie } from '../services/reportes.service';

export const AnimalesPage = () => {
	const [page, setPage] = useState(1);
	const [searchInput, setSearchInput] = useState('');
	const limit = 10;

	const isOpenModal = useGeneralStore(state => state.isOpenModal);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);
	const fincaId = useAuthStore(state => state.fincaId);

	const getAnimales = useAnimalesStore(state => state.getAnimales);
	const totalAnimales = useAnimalesStore(
		state => state.totalAnimales
	);
	const getGrupos = useAnimalesStore(state => state.getGrupos);
	const getEstadosReproductivos = useAnimalesStore(
		state => state.getEstadosReproductivos
	);
	const getRazas = useAnimalesStore(state => state.getRazas);

	// Métodos Paginación
	const handleNextPage = () => {
		setPage(page + 1);
	};

	const handlePrevPage = () => {
		if (page > 1) setPage(page - 1);
	};
	const animales = useAnimalesStore(state => state.animales);

	useEffect(() => {
		getGrupos();
		getRazas();
		getEstadosReproductivos();
	}, []);

	useEffect(() => {
		getAnimales(fincaId, page, limit, searchInput);
	}, [page, animales.length, searchInput]);

	const onChangeModal = () => {
		setIsOpenModal(true);
	};

	const handleSearchInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newSearchTerm = e.target.value.trim();
		setSearchInput(newSearchTerm);
	};

	const descargarReporte = async () => {
		if (fincaId) {
			try {
				const data = await ReportesServie.getReporteAnimales(fincaId);
				const url = window.URL.createObjectURL(new Blob([data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'reporte_animales.xlsx'); // Asegúrate de que el nombre coincida con tu expectativa
				document.body.appendChild(link);
				link.click();
				link.remove(); // Limpiar después de descargar
				window.URL.revokeObjectURL(url); // Liberar recursos
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className=' h-full flex flex-col gap-7 '>
			<div className='flex items-center justify-between'>
				<h3 className='text-3xl font-bold'>Lista de Animales</h3>
				<div className='flex gap-5'>
					<ButtonModal
						textLabel={'Añadir Animal'}
						Icon={FaPlus}
						color='secondaryGreen'
						onClick={onChangeModal}
					/>
					<button
						className={`bg-slate-200 px-5 rounded-lg py-2 flex items-center justify-center gap-3 font-bold  hover:bg-slate-300 transition-all duration-500  ${
							animales.length === 0 ? 'cursor-not-allowed' : ''
						} `}
						disabled={animales.length === 0}
						onClick={descargarReporte}
					>
						<RiFileExcel2Fill className='text-secondaryGreen' />
						Descargar reporte
					</button>
				</div>
			</div>
			<section className='flex flex-col bg-white flex-1 rounded-lg p-5 gap-10'>
				<div className='flex w-full justify-between items-center '>
					<div className='flex gap-3 flex-1 '>
						<div className='flex border border-[#BBB] items-center px-4 gap-4 rounded-[5px] w-[40%]'>
							<MdSearch size={25} color='#BBB' />
							<input
								type='search'
								placeholder='buscar por nombre o por identificación'
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
							{page} de {Math.ceil(totalAnimales / limit) || 1}
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
									page === Math.ceil(totalAnimales / limit) ||
									totalAnimales === 0
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

				<AnimalesTableList />
			</section>
			{isOpenModal && (
				<ModalForm title='Añadir Animal'>
					<AddAnimal />
				</ModalForm>
			)}
		</div>
	);
};
