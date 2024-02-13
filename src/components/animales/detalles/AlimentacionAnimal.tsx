import { useState } from 'react';
import { LayoutInfoAnimal } from './LayoutInfoAnimal';
import {
	AddAlimentacion,
	CardInfo,
	EditAlimentacion,
	Loader,
	ModalDelete,
	ModalForm,
} from '../../../components';
import { MdEdit } from 'react-icons/md';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { IoChevronBack } from 'react-icons/io5';
import { ButtonModal } from '../../shared/ButtonModal';
import { useOutletContext } from 'react-router-dom';
import { Alimentacion, AnimalLoader } from '../../../interfaces';
import { formatearFecha } from '../../../helpers/formatDate';
import { useAnimalesStore } from '../../../store/animales';
import { useGeneralStore } from '../../../store/general/general.store';

const tableHeaders = [
	'Fecha de registro',
	'Cantidad (kg)',
	'Observaciones',
];

export const AlimentacionAnimal = () => {
	const { animalInfo } = useOutletContext<AnimalLoader>();

	const [nameModal, setNameModal] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedAlimentacion, setSelectedAlimentacion] =
		useState<Alimentacion | null>(null);

	const setModalError = useGeneralStore(state => state.setModalError);

	const alimentacionAnimal = useAnimalesStore(
		state => state.alimentacion
	);
	const deleteAlimentacion = useAnimalesStore(
		state => state.deleteAlimentacion
	);

	const onChangeModal = (label: string) => {
		setIsOpenModal(true);
		setNameModal(label);
	};

	const handleSelectAlimentacion = (
		alimentacion: Alimentacion | null
	) => {
		setSelectedAlimentacion(alimentacion);
	};

	const onDelete = async () => {
		await deleteAlimentacion(selectedAlimentacion!.id, animalInfo.id);
		handleSelectAlimentacion(null);
		setModalError(false);
	};

	if (!alimentacionAnimal) return <Loader />;

	return (
		<LayoutInfoAnimal title='Alimentación'>
			{alimentacionAnimal.length === 0 && !selectedAlimentacion && (
				<div className='flex flex-col  justify-center p-8 gap-5'>
					<h3 className='text-2xl font-bold '>
						No hay registros de alimentación
					</h3>
					<p className='text-md text-primaryGray'>
						Puede añadir en el siguiente botón
					</p>
					<div className='self-start'>
						<ButtonModal
							textLabel='Añadir Alimentación'
							color='secondaryGreen'
							Icon={FaPlus}
							onClick={() => onChangeModal('añadirAlimentacion')}
						/>
					</div>
				</div>
			)}

			{alimentacionAnimal.length > 0 && !selectedAlimentacion && (
				// Lista de registros de alimentación
				<div className='flex flex-col'>
					<div className='self-end m-5 absolute bottom-0'>
						<ButtonModal
							textLabel='Añadir Alimentación'
							color='secondaryGreen'
							Icon={FaPlus}
							onClick={() => onChangeModal('añadirAlimentacion')}
						/>
					</div>
					{/* ROW TITLE */}
					<div className='grid grid-cols-3 bg-purple80 py-4 rounded-[5px] px-6 items-center justify-center'>
						{tableHeaders.map(header => (
							<h4
								className='font-bold text-white text-center'
								key={header}
							>
								{header}
							</h4>
						))}
					</div>
					{alimentacionAnimal.map((alimentacion, index) => (
						<div
							className={`grid grid-cols-3 ${
								index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
							} py-4 rounded-[5px] px-6 items-center hover:bg-slate-100 cursor-pointer hover:underline`}
							onClick={() => handleSelectAlimentacion(alimentacion)}
							key={alimentacion.id}
						>
							<span className='font-bold text-center'>
								{formatearFecha(alimentacion.fechaRegistro)}
							</span>
							<span className='font-bold text-center capitalize'>
								{alimentacion.cantidad}
							</span>
							<span
								className={`font-bold  capitalize  whitespace-normal overflow-hidden break-words ${
									alimentacion.observaciones ? '' : 'text-center'
								}`}
							>
								{alimentacion.observaciones
									? alimentacion.observaciones.length > 50
										? alimentacion.observaciones.slice(0, 50) + '...'
										: alimentacion.observaciones
									: '-'}
							</span>
						</div>
					))}
				</div>
			)}

			{selectedAlimentacion && (
				// Se muestra la información detallada de la alimentación individual
				<>
					<button
						className='ml-8 mt-8 text-purple80 font-bold flex gap-3 items-center '
						onClick={() => setSelectedAlimentacion(null)}
					>
						<IoChevronBack className='text-purple80 text-xl' />
						Volver
					</button>
					<div className='grid grid-cols-2 gap-5 p-8'>
						<CardInfo
							title='Cantidad'
							content={`${selectedAlimentacion.cantidad}kg`}
							tooltipText='Cantidad de suplemento que consume el animal'
						/>
						<CardInfo
							title='Fecha de Registro de suplemento'
							content={formatearFecha(
								selectedAlimentacion.fechaRegistro
							)}
							tooltipText='Fecha que se le dió el suplemento al animal'
						/>
						<div className='col-span-2 '>
							<CardInfo
								title='Observaciones'
								content={
									selectedAlimentacion.observaciones
										? selectedAlimentacion.observaciones
										: '-'
								}
								tooltipText='Observaciones de la alimentación del animal'
							/>
						</div>
					</div>
					<div className='flex gap-5 items-center justify-center '>
						<button
							className=' flex gap-2 items-center rounded-lg py-2 px-6 text-white bg-sky-500 hover:bg-sky-600 transition-all font-bold text-sm'
							onClick={() => onChangeModal('editarAlimentacion')}
						>
							<MdEdit
								className='text-white  transition-all'
								size={20}
							/>
							Editar
						</button>
						<button
							className=' flex gap-2 items-center rounded-lg py-2 px-6 text-white bg-red-500 hover:bg-red-600 transition-all  font-bold text-sm'
							onClick={() => setModalError(true)}
						>
							<FaTrashAlt
								className='text-white  transition-all'
								size={15}
							/>
							Eliminar
						</button>
					</div>
				</>
			)}
			{isOpenModal && (
				<ModalForm
					title='Añadir Alimentación'
					setIsOpenModalLocal={setIsOpenModal}
					height=''
				>
					{nameModal === 'añadirAlimentacion' ? (
						<AddAlimentacion
							setIsOpenModalLocal={setIsOpenModal}
							animalById={animalInfo}
						/>
					) : (
						<EditAlimentacion
							setIsOpenModalLocal={setIsOpenModal}
							alimentacionAnimal={selectedAlimentacion}
							animalById={animalInfo}
							setSelectedAlimentacion={setSelectedAlimentacion}
						/>
					)}
				</ModalForm>
			)}

			<ModalDelete handleDelete={onDelete} />
		</LayoutInfoAnimal>
	);
};
