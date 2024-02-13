import { useEffect, useRef, useState } from 'react';
import { CardInfo } from '../shared/CardInfo';
import { EditParto } from './EditParto';
import { Parto, ReproduccionAnimalLoader } from '../../interfaces';
import { useReproduccionStore } from '../../store/reproduccion';
import {
	calcularEdadEnMeses,
	calcularEdadPrimerParto,
	calcularIntervaloEntrePartos,
	obtenerPrimerParto,
} from '../../helpers/functions';
import { FaTrashAlt } from 'react-icons/fa';
import { useGeneralStore } from '../../store';
import { ModalDelete } from '../shared/ModalDelete';

interface ViewMorePartoProps {
	reproduccionAnimalInfo: ReproduccionAnimalLoader;
	parto?: Parto | null;
	setIsOpenModalLocal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ViewMoreParto: React.FC<ViewMorePartoProps> = ({
	reproduccionAnimalInfo,
	parto,
	setIsOpenModalLocal,
}) => {
	const { info: animal } = reproduccionAnimalInfo;

	const partos = useReproduccionStore(state => state.partos);
	const deleteParto = useReproduccionStore(
		state => state.deleteParto
	);

	const setModalError = useGeneralStore(state => state.setModalError);

	const primerParto = obtenerPrimerParto(partos);
	const edadPrimerParto = calcularEdadPrimerParto(
		animal.fechaNacimiento,
		primerParto.fechaParto
	);

	const intervalos = calcularIntervaloEntrePartos(partos);

	console.log(parto);

	const onDelete = () => {
		deleteParto(animal.id, parto!.id);
		setModalError(false);
		setIsOpenModalLocal(false);
	};

	return (
		<div className='flex flex-col gap-6 py-5'>
			<div className='flex flex-col gap-12  overflow-auto'>
				<div className='grid grid-cols-3 gap-5'>
					<CardInfo
						title='Número de parto'
						tooltipText='Muestra el número de parto'
						content={parto?.numeroParto.toString() || '-'}
					/>

					<CardInfo
						title='Fecha de Parto'
						tooltipText='Muestra la fecha de parto registrada'
						content={parto?.fechaParto || '-'}
					/>

					<CardInfo
						title='Número de crías'
						tooltipText='Muestra el número de crías que tuvo el animal en el parto'
						content={parto?.crias.length.toString() || '-'}
					/>

					{parto?.crias.map((cria, index) => (
						<CardInfo
							key={index}
							title={`Sexo de la cría ${index + 1}`}
							tooltipText={`Muestra el sexo de la cría ${index + 1}`}
							content={cria.sexo.toLowerCase()}
						/>
					))}

					{parto?.numeroParto === 1 ? (
						<CardInfo
							title='Edad al parto 1'
							tooltipText='Muestra la edad del animal desde que nació hasta su primer parto'
							content={`${edadPrimerParto} meses` || '-'}
						/>
					) : (
						<CardInfo
							title='Intervalo de partos'
							tooltipText='Muestra el intervalo de tiempo entre el parto anterior y el actual'
							content={
								`${intervalos[parto!.numeroParto - 2]} días` || '-'
							}
						/>
					)}
				</div>

				{/* !TODO === HISTORIAL DE SERVICIOS DESDE EL BACKEND */}
				{/* <div className='flex flex-col gap-5'>
					<h2 className='text-4xl font-bold text-center mb-5'>
						Historial de servicios
					</h2>

					<div className='grid grid-cols-3 gap-5'>
						<CardInfo
							title='Número de servicios'
							tooltipText='Muestra el número de servicios que tuvo relacionado con el parto'
							content='3'
						/>
						<CardInfo
							title='Fecha de servicio'
							tooltipText='Muestra la fecha de servicio en que fue preñada'
							content='30 de septiembre 2022'
						/>
						<CardInfo
							title='Fecha de celo'
							tooltipText='Muestra la fecha de celo en que fue preñada'
							content='28 de septiembre 2022'
						/>
						<CardInfo
							title='Resultado Preñez'
							tooltipText='Muestra el resultado de preñez del servicio'
							content='Preñada'
						/>
					</div>
				</div> */}

				<button
					className=' flex gap-2 items-center rounded-lg py-3 px-10 text-white bg-red-500 hover:bg-red-600 transition-all  font-bold text-sm self-center'
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
			<ModalDelete handleDelete={onDelete} />
		</div>
	);
};
