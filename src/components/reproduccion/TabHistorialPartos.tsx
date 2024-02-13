import { CardInfo } from '../shared/CardInfo';
import { ButtonModal } from '../shared/ButtonModal';
import { useState } from 'react';
import { ModalForm } from '../shared/ModalForm';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { AddParto } from './AddParto';
import { ViewMoreParto } from './ViewMoreParto';
import { Parto, ReproduccionAnimalLoader } from '../../interfaces';
import { useReproduccionStore } from '../../store/reproduccion';
import { EditParto } from './EditParto';
import {
	calcularEdadEnMeses,
	calcularEdadPrimerParto,
	calcularIntervaloEntrePartos,
	obtenerPrimerParto,
} from '../../helpers/functions';

interface tabHistorialPartosProps {
	reproduccionAnimalInfo: ReproduccionAnimalLoader;
}

export const TabHistorialPartos: React.FC<
	tabHistorialPartosProps
> = ({ reproduccionAnimalInfo }) => {
	const [nameModal, setNameModal] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedParto, setSelectedParto] = useState<Parto | null>(
		null
	);

	const partos = useReproduccionStore(state => state.partos);
	console.log(partos);

	const primerParto = obtenerPrimerParto(partos);
	const edadPrimerParto = calcularEdadPrimerParto(
		reproduccionAnimalInfo.info.fechaNacimiento,
		primerParto.fechaParto
	);

	const onChangeModal = (label: string, parto?: Parto) => {
		setIsOpenModal(true);
		setNameModal(label);
		if (parto) {
			setSelectedParto(parto);
		}
	};

	const intervalos = calcularIntervaloEntrePartos(partos);

	return (
		<div className='p-7 flex flex-col gap-8 items-center relative'>
			<div className='flex flex-col gap-5 w-full '>
				{/* ROW PARTO  */}
				{partos.length > 0 ? (
					<>
						<h3 className='font-bold text-4xl mt-4'>Partos</h3>

						{partos.map((parto, index) => (
							<div
								className='flex justify-between items-center gap-2'
								key={parto.id}
							>
								<div className='h-[25px] w-[25px] bg-purple80 rounded-full'></div>
								<div className='grid grid-cols-4 gap-3'>
									<CardInfo
										title='Número de Parto'
										content={index + 1}
										tooltipText='Muestra el número de parto del animal'
									/>
									<CardInfo
										title='Fecha de Parto'
										content={parto.fechaParto}
										tooltipText='Muestra la fecha en la que se realizó el parto del animal'
									/>
									<CardInfo
										title='Número de Crías'
										content={parto.crias.length.toString()}
										tooltipText='Muestra el número de crías que tuvo el animal en el parto'
									/>
									{parto.numeroParto === 1 ? (
										<CardInfo
											title='Edad al parto 1'
											content={`${edadPrimerParto} meses` || '-'}
											tooltipText='Muestra la edad del animal desde que nació hasta su primer parto'
										/>
									) : (
										<CardInfo
											title='Intervalo  partos'
											content={`${intervalos[index - 1]} días` || '-'}
											tooltipText='Muestra el intervalo de tiempo entre el parto anterior y el actual'
										/>
									)}
								</div>
								<button
									className='text-white bg-purple80 w-[110px] cursor-pointer font-bold rounded-md h-[40px] text-sm'
									onClick={() => onChangeModal('verMas', parto)}
								>
									Ver más
								</button>
							</div>
						))}
					</>
				) : (
					<div className='flex justify-center items-center h-28'>
						<p className='text-xl font-bold text-primaryGray'>
							No hay partos registrados
						</p>
					</div>
				)}
			</div>

			<div className=' absolute right-0 mr-6 top-5 '>
				{partos.length > 0 ? (
					<ButtonModal
						textLabel='Editar Partos'
						color='blueEdit'
						onClick={() => onChangeModal('editarParto')}
						Icon={FaEdit}
					/>
				) : (
					<ButtonModal
						textLabel='Añadir Parto'
						color='secondaryGreen'
						onClick={() => onChangeModal('añadirParto')}
						Icon={FaPlus}
					/>
				)}
			</div>

			{isOpenModal && (
				<ModalForm
					title={
						nameModal === 'añadirParto'
							? 'Añadir Parto'
							: nameModal === 'editarParto'
							? 'Editar Parto'
							: 'Información Individual del Parto'
					}
					setIsOpenModalLocal={setIsOpenModal}
				>
					{nameModal === 'añadirParto' ? (
						<AddParto
							reproduccionAnimalInfo={reproduccionAnimalInfo}
							setIsOpenModalLocal={setIsOpenModal}
						/>
					) : nameModal === 'editarParto' ? (
						<EditParto
							reproduccionAnimalInfo={reproduccionAnimalInfo}
							setIsOpenModalLocal={setIsOpenModal}
						/>
					) : (
						<ViewMoreParto
							reproduccionAnimalInfo={reproduccionAnimalInfo}
							parto={selectedParto}
							setIsOpenModalLocal={setIsOpenModal}
						/>
					)}
				</ModalForm>
			)}
		</div>
	);
};
