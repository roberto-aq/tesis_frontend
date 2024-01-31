import { ButtonModal } from '../components/shared/ButtonModal';
import { FaPlus } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import { LuFilter } from 'react-icons/lu';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';

import {
	AddAnimal,
	AnimalesTableList,
	Loader,
	ModalForm,
} from '../components';
import { useAuthStore, useGeneralStore } from '../store';
import { useAnimalesStore } from '../store/animales';
import { useEffect } from 'react';

export const AnimalesPage = () => {
	const isOpenModal = useGeneralStore(state => state.isOpenModal);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);
	const fincaId = useAuthStore(state => state.fincaId);

	const getAnimales = useAnimalesStore(state => state.getAnimales);
	const getGrupos = useAnimalesStore(state => state.getGrupos);
	const getEstadosReproductivos = useAnimalesStore(
		state => state.getEstadosReproductivos
	);
	const getRazas = useAnimalesStore(state => state.getRazas);

	const isLoading = useAnimalesStore(state => state.isLoading);

	useEffect(() => {
		getAnimales(fincaId);
		getGrupos();
		getRazas();
		getEstadosReproductivos();
	}, []);

	const onChangeModal = () => {
		setIsOpenModal(true);
	};

	if (isLoading) return <Loader />;

	return (
		<div className=' h-full flex flex-col gap-7 '>
			<div className='flex items-center justify-between'>
				<h3 className='text-3xl font-bold'>Lista de Animales</h3>
				<ButtonModal
					textLabel={'Añadir Animal'}
					Icon={FaPlus}
					color='secondaryGreen'
					onClick={onChangeModal}
				/>
			</div>
			<section className='flex flex-col bg-white flex-1 rounded-lg p-5 gap-10'>
				<div className='flex w-full justify-between items-center'>
					<div className='flex gap-3'>
						<div className='flex border border-[#BBB] items-center px-4 gap-4 rounded-[5px]'>
							<MdSearch size={25} color='#BBB' />
							<input
								type='search'
								placeholder='buscar'
								className='capitalize outline-none  self-stretch'
							/>
						</div>
						<button className='flex items-center justify-center border border-[#BBB] rounded-[5px] w-[48px] h-[48px]'>
							<LuFilter size={25} color='#BBB' />
						</button>
					</div>
					<div className='flex items-center gap-7'>
						<span className='font-bold text-secondGray'>1 de 1</span>
						{/* PAGINACIÓN */}
						<div className='flex gap-4 items-center'>
							<button className='border-2 border-secondaryGreen w-8 h-8 flex items-center justify-center rounded-full'>
								<FaChevronLeft
									size={15}
									className='text-secondaryGreen'
								/>
							</button>
							<button className='border-2 border-secondaryGreen w-8 h-8 flex items-center justify-center rounded-full'>
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
