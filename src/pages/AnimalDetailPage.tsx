import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import {
	ButtonModal,
	DataHeader,
	EditAnimal,
	Loader,
	ModalForm,
	SidebarDetailsAnimal,
} from '../components';
import { MdEdit } from 'react-icons/md';
import { Animal } from '../interfaces';
import { useGeneralStore } from '../store';
import { FaTrashAlt } from 'react-icons/fa';
import { useAnimalesStore } from '../store/animales';
import { useEffect } from 'react';
import { animalLoaderData } from '../router/loaders/animalesLoader';

export const AnimalDetailPage = () => {
	const { animalInfo } = useLoaderData() as animalLoaderData;
	const isOpenModal = useGeneralStore(state => state.isOpenModal);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);
	const deleteAnimal = useAnimalesStore(state => state.deleteAnimal);
	const getRazas = useAnimalesStore(state => state.getRazas);
	const getGrupos = useAnimalesStore(state => state.getGrupos);
	const getEstadosReproductivos = useAnimalesStore(
		state => state.getEstadosReproductivos
	);
	const navigate = useNavigate();
	console.log({ animalInfo });

	useEffect(() => {
		getRazas();
		getGrupos();
		getEstadosReproductivos();
	}, []);

	if (!animalInfo) return <Loader />;

	const onChangeModal = () => {
		setIsOpenModal(true);
	};

	const onDeleteAnimal = async () => {
		try {
			await deleteAnimal(animalInfo.id);
			navigate('/inicio/animales', { replace: true });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	return (
		<div className='flex gap-10 flex-1'>
			<SidebarDetailsAnimal />
			<div className='flex  flex-col gap-6 flex-1'>
				<section className='flex flex-col'>
					<div className='flex   justify-between'>
						<h3 className='text-[30px] font-bold'>
							#{animalInfo.numeroIdentificador}
						</h3>
					</div>
					<div className='flex justify-between items-center'>
						<p className='font-bold text-[24px] text-primaryGray'>
							{animalInfo.nombre}
						</p>

						<div className='flex gap-3'>
							<ButtonModal
								textLabel='Editar Animal'
								color='blueEdit'
								Icon={MdEdit}
								onClick={onChangeModal}
							/>
							<button
								className='bg-red-500 w-10 flex items-center justify-center rounded-md cursor-pointer hover:bg-red-600'
								onClick={onDeleteAnimal}
							>
								<FaTrashAlt size={20} color='#fff' />
							</button>
						</div>
					</div>
				</section>
				<DataHeader animal={animalInfo} />

				<Outlet context={{ animalInfo }} />
			</div>
			{isOpenModal && (
				<ModalForm title='Editar Animal'>
					<EditAnimal animalById={animalInfo} />
				</ModalForm>
			)}
		</div>
	);
};
