import { useEffect, useState } from 'react';
import { CardInfo } from '../shared/CardInfo';
import { useGeneralStore } from '../../store';
import { ModalForm } from '../shared/ModalForm';
import { ButtonModal } from '../shared/ButtonModal';
import { useReproduccionStore } from '../../store/reproduccion';
import { useLoaderData } from 'react-router-dom';
import { ReproduccionAnimalLoader } from '../../interfaces';

export const TabServiciosActuales = () => {
	const { info: animal } =
		useLoaderData() as ReproduccionAnimalLoader;
	const [nameModal, setNameModal] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);

	const servicios = useReproduccionStore(state => state.servicios);

	console.log(servicios);

	const onChangeModal = (label: string) => {
		setIsOpenModal(true);
		setNameModal(label);
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
										content={servicio.fechaServicio}
										tooltipText='Muestra la fecha en la que se realizó el servicio'
									/>
									<CardInfo
										title='Fecha de Celo'
										content={servicio.fechaCelo}
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
											// TODOOOO
											content='30 de septiembre 2022'
											tooltipText='Muestra la fecha estimada de parto del animal'
										/>
									</div>
								</div>
								<button
									className='text-white bg-purple80 w-[110px] cursor-pointer font-bold rounded-md h-[40px] text-sm'
									onClick={() => onChangeModal('verMas')}
								>
									Ver más
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
		</div>
	);
};
