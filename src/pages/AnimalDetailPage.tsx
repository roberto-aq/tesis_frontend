import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import {
	AlertError,
	ButtonModal,
	DataHeader,
	EditAnimal,
	Loader,
	ModalDelete,
	ModalForm,
	SidebarDetailsAnimal,
} from '../components';
import { MdEdit } from 'react-icons/md';
import { useGeneralStore } from '../store';
import { FaTrashAlt } from 'react-icons/fa';
import { useAnimalesStore } from '../store/animales';
import { useEffect } from 'react';

export const AnimalDetailPage = () => {
	const isOpenModal = useGeneralStore(state => state.isOpenModal);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);
	const showAlertError = useGeneralStore(
		state => state.showAlertError
	);
	const setShowAlertError = useGeneralStore(
		state => state.setShowAlertError
	);
	const setModalError = useGeneralStore(state => state.setModalError);

	const animalInfo = useAnimalesStore(state => state.animalById);
	const deleteAnimal = useAnimalesStore(state => state.deleteAnimal);
	const getRazas = useAnimalesStore(state => state.getRazas);
	const getGrupos = useAnimalesStore(state => state.getGrupos);
	const getEstadosReproductivos = useAnimalesStore(
		state => state.getEstadosReproductivos
	);
	const error = useAnimalesStore(state => state.error);

	const navigate = useNavigate();

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
		const success = await deleteAnimal(animalInfo.id);

		if (success) navigate('/inicio/animales', { replace: true });

		setShowAlertError(true);
		setModalError(false);
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
								onClick={() => setModalError(true)}
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

			<ModalDelete handleDelete={onDeleteAnimal} />

			{showAlertError && error && <AlertError error={error} />}
		</div>
	);
};
