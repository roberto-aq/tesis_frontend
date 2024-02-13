import { useEffect, useState } from 'react';
import { CardInfo } from '../shared/CardInfo';
import { useGeneralStore } from '../../store';
import { ModalForm } from '../shared/ModalForm';
import { ButtonModal } from '../shared/ButtonModal';
import { useReproduccionStore } from '../../store/reproduccion';
import { useLoaderData } from 'react-router-dom';
import { ReproduccionAnimalLoader, Servicio } from '../../interfaces';
import { FaTrashAlt } from 'react-icons/fa';
import { ModalDelete } from '../shared/ModalDelete';
import { formatearFecha } from '../../helpers/formatDate';

export const TabServiciosActuales = () => {
	const { info: animal } =
		useLoaderData() as ReproduccionAnimalLoader;
	const [nameModal, setNameModal] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedServicio, setSelectedServicio] = useState(
		{} as Servicio
	);

	const servicios = useReproduccionStore(state => state.servicios);
	const deleteServicio = useReproduccionStore(
		state => state.deleteServicio
	);

	const setModalError = useGeneralStore(state => state.setModalError);

	// Ordenar servicios por fecha de servicio de más reciente a más antiguo
	const serviciosOrdenados = servicios.sort(
		(a, b) => +new Date(b.fechaServicio) - +new Date(a.fechaServicio)
	);

	const ultimoServicio = serviciosOrdenados[0];

	// Encuentra el último servicio con el estado 'Preñada'
	const ultimoServicioPreñada = servicios.find(
		servicio =>
			servicio.estadoReproductivo.descripcion.toLowerCase() ===
			'preñada'
	);

	let fechaEstimadaParto: any;

	if (ultimoServicioPreñada) {
		const duracionGestacion = 280; // Duración promedio de la gestación en días

		fechaEstimadaParto = new Date(
			ultimoServicioPreñada.fechaServicio
		);
		fechaEstimadaParto.setDate(
			fechaEstimadaParto.getDate() + duracionGestacion
		);
	}

	// const onChangeModal = (label: string, servicio: Servicio) => {
	// 	setIsOpenModal(true);
	// 	setNameModal(label);
	// };

	const onDelete = () => {
		deleteServicio(animal.id, selectedServicio.id);
		setModalError(false);
	};

	return (
		<div className='p-7 flex flex-col gap-8 items-center relative'>
			{servicios.length > 0 ? (
				<>
					<h3 className='font-bold text-4xl mt-4'>Servicios</h3>
					<div className='flex flex-col gap-5 w-full '>
						{/* ROW SERVICIO  */}
						{servicios.map(servicio => (
							<div
								className='flex justify-between items-center gap-2'
								key={servicio.id}
							>
								<div className='h-[25px] w-[25px] bg-purple80 rounded-full'></div>
								<div className='grid grid-cols-4 gap-3'>
									<CardInfo
										title='Número de Servicio'
										content={servicio.numeroServicio.toString()}
										tooltipText='Muestra el número de servicio del animal'
									/>
									<CardInfo
										title='Fecha de Servicio'
										content={formatearFecha(servicio.fechaServicio)}
										tooltipText='Muestra la fecha en la que se realizó el servicio'
									/>
									<CardInfo
										title='Fecha de Celo'
										content={formatearFecha(servicio.fechaCelo)}
										tooltipText='Muestra la fecha en la que el animal entró en celo'
									/>
									<CardInfo
										title='Resultado Preñez'
										content={servicio.estadoReproductivo.descripcion}
										tooltipText='Muestra el resultado de la preñez del animal (Servida, Aborto, Preñada)'
									/>
									<div className='col-span-2'>
										<CardInfo
											title='Fecha estimada de Parto'
											content={
												formatearFecha(fechaEstimadaParto) || '-'
											}
											tooltipText='Muestra la fecha estimada de parto del animal'
										/>
									</div>
								</div>
								<button
									className=' flex gap-2 items-center rounded-lg py-2 px-5 text-white bg-red-500 hover:bg-red-600 transition-all  font-bold text-sm self-center'
									onClick={() => {
										setModalError(true);
										setSelectedServicio(servicio);
									}}
								>
									<FaTrashAlt
										className='text-white  transition-all'
										size={15}
									/>
									Eliminar
								</button>
							</div>
						))}
					</div>
				</>
			) : (
				<div className='flex justify-center items-center h-28'>
					<p className='text-xl font-bold text-primaryGray'>
						No hay servicios registrados
					</p>
				</div>
			)}

			{isOpenModal && (
				<ModalForm
					title='Ver más'
					setIsOpenModalLocal={setIsOpenModal}
				>
					{nameModal === 'verMas' ? <p>Hola</p> : ''}
				</ModalForm>
			)}

			<ModalDelete handleDelete={onDelete} />
		</div>
	);
};
