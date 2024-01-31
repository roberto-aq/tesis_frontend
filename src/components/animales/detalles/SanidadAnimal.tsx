import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { ButtonModal } from '../../shared/ButtonModal';
import { ModalForm } from '../../shared/ModalForm';
import { LayoutInfoAnimal } from './LayoutInfoAnimal';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { CardInfo } from '../../shared/CardInfo';
import { IoChevronBack } from 'react-icons/io5';
import { AddSanidad } from './AddSanidad';
import { EditSanidad } from './EditSanidad';
import { useOutletContext } from 'react-router-dom';
import { animalLoaderData } from '../../../router/loaders/animalesLoader';
import { Sanidad } from '../../../interfaces';
import { formatDateShort } from '../../../helpers/formatDate';
import { useAnimalesStore } from '../../../store/animales';

const tableHeaders = ['Fecha de registro', 'Observaciones'];

export const SanidadAnimal = () => {
	const { animalInfo } = useOutletContext<animalLoaderData>();

	const [nameModal, setNameModal] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);

	const sanidad = useAnimalesStore(state => state.sanidad);
	const deleteSanidad = useAnimalesStore(
		state => state.deleteSanidad
	);

	const onChangeModal = (label: string) => {
		setIsOpenModal(true);
		setNameModal(label);
	};
	const [selectedSanidad, setSelectedSanidad] =
		useState<Sanidad | null>(null);

	const handleSelectSanidad = (sanidad: Sanidad | null) => {
		setSelectedSanidad(sanidad);
	};

	const onDelete = async () => {
		try {
			await deleteSanidad(selectedSanidad!.id, animalInfo.id);
			handleSelectSanidad(null);
		} catch (error: any) {
			throw new Error(error);
		}
	};

	return (
		<LayoutInfoAnimal title='Sanidad'>
			{sanidad.length === 0 && !selectedSanidad && (
				<div className='flex flex-col  justify-center p-8 gap-5'>
					<h3 className='text-2xl font-bold '>
						No hay ninguna observación registrada
					</h3>
					<p className='text-md text-primaryGray'>
						Puede añadir en el siguiente botón
					</p>
					<div className='self-start'>
						<ButtonModal
							textLabel='Añadir Sanidad'
							color='secondaryGreen'
							Icon={FaPlus}
							onClick={() => onChangeModal('añadirSanidad')}
						/>
					</div>
				</div>
			)}

			{sanidad.length > 0 && !selectedSanidad && (
				<div className='flex flex-col'>
					<div className='self-end m-5 absolute bottom-0'>
						<ButtonModal
							textLabel='Añadir Sanidad'
							color='secondaryGreen'
							Icon={FaPlus}
							onClick={() => onChangeModal('añadirSanidad')}
						/>
					</div>
					{/* ROW TITLE */}
					<div className='grid grid-cols-2 px-12 bg-purple80 py-4 rounded-[5px] items-center '>
						{tableHeaders.map(header => (
							<h4
								className='font-bold text-white text-center'
								key={header}
							>
								{header}
							</h4>
						))}
					</div>
					{sanidad.map((sanidad, index) => (
						<div
							className={`grid grid-cols-2 ${
								index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
							} py-4 rounded-[5px] px-12 items-center hover:bg-slate-100 cursor-pointer hover:underline overflow-hidden`}
							onClick={() => handleSelectSanidad(sanidad)}
							key={sanidad.id}
						>
							<span className='font-bold  capitalize'>
								{formatDateShort(sanidad.fechaRegistro)}
							</span>
							<span className='font-bold  capitalize  whitespace-normal overflow-hidden break-words'>
								{sanidad.observaciones
									? sanidad.observaciones.length > 50
										? sanidad.observaciones.slice(0, 50) + '...'
										: sanidad.observaciones
									: '-'}
							</span>
						</div>
					))}
					{/* INFO ROW */}
				</div>
			)}

			{selectedSanidad && (
				// Se muestra la información detallada de la alimentación individual
				<>
					<button
						className='ml-8 mt-8 text-purple80 font-bold flex gap-3 items-center '
						onClick={() => setSelectedSanidad(null)}
					>
						<IoChevronBack className='text-purple80 text-xl' />
						Volver
					</button>
					<div className='grid grid-cols-2 gap-5 p-8'>
						<CardInfo
							title='Fecha de registro de observación'
							content={formatDateShort(selectedSanidad.fechaRegistro)}
							tooltipText='Fecha que se registró la observación de sanidad del animal'
						/>
						<div className='col-span-2'>
							<CardInfo
								title='Observaciones'
								content={
									selectedSanidad.observaciones
										? selectedSanidad.observaciones
										: '-'
								}
								tooltipText='Observaciones de la sanidad del animal'
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
							onClick={onDelete}
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
					title='Añadir Sanidad'
					setIsOpenModalLocal={setIsOpenModal}
					height=''
				>
					{nameModal === 'añadirSanidad' ? (
						<AddSanidad
							setIsOpenModalLocal={setIsOpenModal}
							animalById={animalInfo}
						/>
					) : (
						<EditSanidad
							animalById={animalInfo}
							setIsOpenModalLocal={setIsOpenModal}
							sanidadAnimal={selectedSanidad}
							setSelectedSanidad={setSelectedSanidad}
						/>
					)}
				</ModalForm>
			)}
		</LayoutInfoAnimal>
	);
};
