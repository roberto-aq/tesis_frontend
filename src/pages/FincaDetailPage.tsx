import { useLoaderData, useNavigate } from 'react-router-dom';
import { FincasResponse } from '../interfaces';
import {
	ButtonModal,
	CardInfo,
	EditFinca,
	ModalDelete,
	ModalForm,
} from '../components';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useGeneralStore } from '../store';
import { useFincasStore } from '../store/fincas/fincas.store';

export const FincaDetailPage = () => {
	// const finca = useLoaderData() as FincasResponse;
	const finca = useFincasStore(state => state.fincaById);
	if (!finca) return null;

	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);
	const isOpenModal = useGeneralStore(state => state.isOpenModal);
	const setModalError = useGeneralStore(state => state.setModalError);

	const deleteFinca = useFincasStore(state => state.deleteFinca);

	const onChangeModal = () => {
		setIsOpenModal(true);
	};
	const navigate = useNavigate();

	const onDeleteFinca = () => {
		deleteFinca(finca.id);
		setModalError(false);
		navigate('/inicio/fincas', { replace: true });
	};

	return (
		<div className='flex flex-col gap-6 h-full'>
			<section className='flex flex-col justify-end '>
				<div className='flex justify-between '>
					<h3 className='text-[40px] font-bold'>{finca.nombre}</h3>
					<div className='flex  h-[45px] self-end gap-3'>
						<ButtonModal
							textLabel='Editar Finca'
							color='blueEdit'
							Icon={FaEdit}
							onClick={onChangeModal}
						/>
						<button
							className='bg-red-500 w-10 flex items-center justify-center rounded-md cursor-pointer hover:bg-red-600'
							onClick={() => {
								setModalError(true);
							}}
						>
							<FaTrashAlt size={20} color='#fff' />
						</button>
					</div>
				</div>
				<h3 className='font-bold text-[24px] text-primaryGray'>
					{finca.municipio}
				</h3>
			</section>
			<div className='bg-white rounded-lg  overflow-auto  flex-1 relative p-8 flex flex-col gap-5'>
				<div className='grid grid-cols-4 gap-3'>
					<CardInfo
						content={finca.propietario}
						title='Propietario'
						tooltipText='Muestra el nombre del propietario de la finca'
					/>
					<CardInfo
						content={finca.administrador}
						title='Administrador'
						tooltipText='Muestra el nombre del administrador de la finca'
					/>
					<CardInfo
						content={finca.veterinario || '-'}
						title='Veterinario'
						tooltipText='Muestra el nombre del veterinario de la finca'
					/>
					<CardInfo
						content={finca.forrajes || '-'}
						title='Forrajes'
						tooltipText='Muestra los forrajes de la finca'
					/>
					<CardInfo
						content={finca.areaTotal.toString()}
						title='Hectáreas útiles'
						tooltipText='Muestra el área total de la finca en hectáreas'
					/>
					<CardInfo
						content={finca.areaAprovechable.toString()}
						title='Hectáreas aprovechables'
						tooltipText='Muestra el área aprovechable de la finca en hectáreas'
					/>
					<CardInfo
						content={
							finca?.numeroPotreros ? finca.numeroPotreros : '-'
						}
						title='Número de Potreros'
						tooltipText='Muestra el número de potreros de la finca'
					/>
					<CardInfo
						content={finca.rotacion ? finca.rotacion : '-'}
						title='Rotación'
						tooltipText='Muestra el número de días de rotación de la finca'
					/>
					<CardInfo
						content={finca.riego ? '✅' : '❌'}
						title='Riego'
						tooltipText='Muestra si la finca tiene riego'
					/>
					<CardInfo
						content={finca.fertilizacion ? '✅' : '❌'}
						title='Fertilización'
						tooltipText='Muestra si la finca tiene fertilización'
					/>
				</div>
				<div className='flex flex-col items-center gap-6'>
					<h2 className='text-[32px] font-bold '>Observaciones</h2>
					<div className='flex-1 w-full'>
						<CardInfo
							content={finca.notas || '-'}
							title='Observaciones'
							tooltipText='Muestra las observaciones de la finca'
						/>
					</div>
				</div>
			</div>
			{isOpenModal && (
				<ModalForm title='Editar Finca'>
					<EditFinca finca={finca} />
				</ModalForm>
			)}

			<ModalDelete handleDelete={onDeleteFinca} />
		</div>
	);
};
