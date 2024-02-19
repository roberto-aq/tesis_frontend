import { useLoaderData } from 'react-router-dom';
import {
	ProduccionAnimalLoader,
	ProduccionResponse,
} from '../interfaces';
import {
	AddProduccion,
	EditProduccion,
	InfoHeaderAnimal,
	ModalDelete,
	ModalForm,
} from '../components';
import { LayoutInfoAnimal } from '../components/animales/detalles/LayoutInfoAnimal';
import { useGeneralStore } from '../store';
import { FaPlus } from 'react-icons/fa6';
import { useProduccionStore } from '../store/produccion/produccion.store';
import { formatDateShort } from '../helpers/formatDate';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRedirectOnFincaChange } from '../hooks/useRedirectOnFincaChange';
import { useReproduccionStore } from '../store/reproduccion';

const tableHeaders = [
	'Fecha de registro',
	'Días de lactancia',
	'Total de Litros',
	'Acciones',
];

export const ProduccionDetailPage = () => {
	const { animal } = useLoaderData() as ProduccionAnimalLoader;

	const [isOpenModalLocal, setIsOpenModalLocal] = useState(false);
	const [selectedProduccion, setSelectedProduccion] =
		useState<ProduccionResponse | null>(null);

	const isOpenModal = useGeneralStore(state => state.isOpenModal);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);
	const setModalError = useGeneralStore(state => state.setModalError);

	const getPartos = useReproduccionStore(state => state.getPartos);

	const produccionList = useProduccionStore(
		state => state.produccionList
	);
	const deleteProduccion = useProduccionStore(
		state => state.deleteProduccion
	);

	const onChangeModal = () => {
		setIsOpenModal(true);
	};

	const onChangeModalLocal = (produccion: ProduccionResponse) => {
		setIsOpenModalLocal(true);
		setSelectedProduccion(produccion);
	};

	const handleDelete = () => {
		if (selectedProduccion) {
			deleteProduccion(selectedProduccion.id, animal.id);
			setModalError(false);
		}
		setModalError(false);
	};

	useEffect(() => {
		getPartos(animal.id);
	}, []);

	useRedirectOnFincaChange('/inicio/produccion', animal);

	return (
		<div className='flex  flex-col gap-6 flex-1'>
			<InfoHeaderAnimal
				animal={animal}
				onChangeModal={onChangeModal}
				textLabel='Añadir Producción'
				Icon={FaPlus}
				color='secondaryGreen'
			/>
			<LayoutInfoAnimal title='Historial de Producción'>
				{produccionList.length > 0 ? (
					<div className='flex flex-col'>
						{/* ROW TITLE */}
						<div className='grid grid-cols-4 bg-purple80 py-4 rounded-[5px] px-6 items-center justify-center'>
							{tableHeaders.map(header => (
								<h4
									className='font-bold text-white text-center'
									key={header}
								>
									{header}
								</h4>
							))}
						</div>
						{produccionList.map((produccion, index) => (
							<div
								className={`grid grid-cols-4 ${
									index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
								} py-4 rounded-[5px] px-6 items-center `}
								key={produccion.id}
							>
								<span className='font-bold text-center capitalize'>
									{formatDateShort(produccion.fechaRegistro)}
								</span>
								<span className='font-bold text-center capitalize'>
									1
								</span>
								<span className='font-bold text-center capitalize'>
									{produccion.totalLitros}
								</span>
								<div className='flex gap-5 justify-center'>
									<button
										className='cursor-pointer'
										onClick={() => onChangeModalLocal(produccion)}
									>
										<MdEdit
											className='text-sky-500  transition-all'
											size={25}
										/>
									</button>
									<button
										className='cursor-pointer'
										onClick={() => {
											setModalError(true);
											setSelectedProduccion(produccion);
										}}
									>
										<FaTrashAlt
											className='text-red-500 transition-all'
											size={25}
										/>
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className='flex flex-col  justify-center p-8 gap-5'>
						<h3 className='text-2xl font-bold '>
							No hay registros de producción
						</h3>
						<p className='text-md text-primaryGray'>
							Al momento de añadir un registro de producción se
							mostrará aquí el historia.
						</p>
					</div>
				)}
			</LayoutInfoAnimal>

			{isOpenModal && (
				<ModalForm title='Agregar Producción'>
					<AddProduccion animalById={animal} />
				</ModalForm>
			)}
			{isOpenModalLocal && (
				<ModalForm
					title={'Editar Producción'}
					setIsOpenModalLocal={setIsOpenModalLocal}
				>
					<EditProduccion
						animalById={animal}
						produccion={selectedProduccion}
						setIsOpenModalLocal={setIsOpenModalLocal}
					/>
				</ModalForm>
			)}

			<ModalDelete handleDelete={handleDelete} />
		</div>
	);
};
