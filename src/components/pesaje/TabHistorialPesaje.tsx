import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { ModalForm } from '../shared/ModalForm';
import { EditPeso } from './EditPeso';
import { usePesajeStore } from '../../store/pesaje/pesaje.store';
import { formatDateShort } from '../../helpers/formatDate';
import { Animal, PesoResponse } from '../../interfaces';
import { Loader } from '../shared/Loader';
import { CardInfo } from '../shared/CardInfo';
import { IoChevronBack } from 'react-icons/io5';
import { ButtonModal } from '../shared/ButtonModal';
import { FaPlus } from 'react-icons/fa6';
import { useGeneralStore } from '../../store';
import { ModalDelete } from '../shared/ModalDelete';

const tableHeaders = [
	'Fecha de Pesaje',
	'Peso (kg)',
	'Observaciones',
];

interface TabHistorialPesajeProps {
	animal: Animal;
}

export const TabHistorialPesaje: React.FC<
	TabHistorialPesajeProps
> = ({ animal }) => {
	const [nameModal, setNameModal] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedPeso, setSelectedPeso] =
		useState<PesoResponse | null>(null);

	const deletePeso = usePesajeStore(state => state.deletePeso);

	const setIsOpenModalAddPeso = useGeneralStore(
		state => state.setIsOpenModal
	);
	const setModalError = useGeneralStore(state => state.setModalError);

	// El nameModal y el label son para colocar el nombre de Modal, esto es para crear un Modal de COnfirmación también para eliminar
	const onChangeModal = (label: string) => {
		setIsOpenModal(true);
		setNameModal(label);
	};

	const onDelete = async () => {
		try {
			await deletePeso(selectedPeso!?.id, animal.id);
			handleSelectPeso(null);
			setModalError(false);
		} catch (error: any) {
			console.log(error);
		}
	};

	const handleSelectPeso = (alimentacion: PesoResponse | null) => {
		setSelectedPeso(alimentacion);
	};

	const pesos = usePesajeStore(state => state.pesos);

	return (
		<div className='mt-1'>
			{pesos.length === 0 && !selectedPeso && (
				<div className='flex flex-col  justify-center p-8 gap-5'>
					<h3 className='text-2xl font-bold '>
						No ha registrado ningún peso todavía
					</h3>
					<p className='text-md text-primaryGray'>
						Agregue los datos respectivos en el botón a continuación
					</p>
					<div className='self-start'>
						<ButtonModal
							textLabel='Añadir Peso'
							color='secondaryGreen'
							Icon={FaPlus}
							onClick={() => setIsOpenModalAddPeso(true)}
						/>
					</div>
				</div>
			)}

			{/* LISTA DE HISTORIAL DE PESAJES */}
			{pesos.length > 0 && !selectedPeso && (
				<div className='flex flex-col'>
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
					{pesos.map((peso, index) => (
						<div
							className={`grid grid-cols-3 ${
								index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
							} py-4 rounded-[5px] px-6 items-center hover:bg-slate-100 cursor-pointer hover:underline`}
							onClick={() => handleSelectPeso(peso)}
							key={peso.id}
						>
							<span className='font-bold text-center capitalize'>
								{formatDateShort(peso.fechaRegistro)}
							</span>
							<span className='font-bold text-center capitalize'>
								{peso.peso}
							</span>
							<span className='font-bold text-center capitalize'>
								{peso.observaciones
									? peso.observaciones.length > 25
										? peso.observaciones.slice(0, 25) + '...'
										: peso.observaciones
									: '-'}
							</span>
						</div>
					))}
				</div>
			)}
			{/* INFORMACIÓN DETALLADA DEL PESO INDIVIDUAL */}
			{selectedPeso && (
				<>
					<button
						className='ml-8 mt-8 text-purple80 font-bold flex gap-3 items-center '
						onClick={() => setSelectedPeso(null)}
					>
						<IoChevronBack className='text-purple80 text-xl' />
						Volver
					</button>
					<div className='grid grid-cols-2 gap-5 p-8'>
						<CardInfo
							title='Peso registrado'
							content={`${selectedPeso.peso}kg`}
							tooltipText='Muestra el peso registrado en esa fecha'
						/>
						<CardInfo
							title='Fecha de Registro de suplemento'
							content={formatDateShort(selectedPeso.fechaRegistro)}
							tooltipText='Fecha que se peso al animal'
						/>
						<div className='col-span-2'>
							<CardInfo
								title='Observaciones'
								content={
									selectedPeso.observaciones
										? selectedPeso.observaciones
										: '-'
								}
								tooltipText='Observaciones del peso del animal'
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
							onClick={() => {
								setModalError(true);
							}}
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
					title='Editar Peso'
					setIsOpenModalLocal={setIsOpenModal}
				>
					<EditPeso
						animal={animal}
						setIsOpenModalLocal={setIsOpenModal}
						setSelectedPeso={setSelectedPeso}
						pesoAnimal={selectedPeso}
					/>
				</ModalForm>
			)}

			<ModalDelete handleDelete={onDelete} />
		</div>
	);
};
