import { useEffect, useRef, useState } from 'react';
import { ReproduccionAnimalLoaderData } from '../../interfaces/loader.interface';
import { CardInfo } from '../shared/CardInfo';
import { EditParto } from './EditParto';

interface ViewMorePartoProps {
	reproduccionAnimalInfo: ReproduccionAnimalLoaderData;
}

export const ViewMoreParto: React.FC<ViewMorePartoProps> = ({
	reproduccionAnimalInfo,
}) => {
	const [showEditForm, setShowEditForm] = useState(false);
	const editFormRef = useRef<HTMLDivElement>(null);

	const onClick = () => {
		console.log('Hizo clic');
		setShowEditForm(true);
	};

	useEffect(() => {
		if (showEditForm && editFormRef.current) {
			editFormRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [showEditForm]);

	return (
		<div className='flex flex-col gap-6 bg-green-200'>
			<div className='flex flex-col gap-12 h-[700px] overflow-auto'>
				<div className='grid grid-cols-3 gap-5'>
					<CardInfo
						title='Número de parto'
						tooltipText='Muestra el número de parto'
						content='1'
					/>

					<CardInfo
						title='Fecha de Parto'
						tooltipText='Muestra la fecha de parto registrada'
						content='30 de septiembre 2022'
					/>

					<CardInfo
						title='Número de crías'
						tooltipText='Muestra el número de crías que tuvo el animal en el parto'
						content='2'
					/>

					<CardInfo
						title='Sexo de la cría 1'
						tooltipText='Muestra el sexo de la cría 1'
						content='Macho'
					/>

					<CardInfo
						title='Edad al parto 1'
						tooltipText='Muestra la edad del animal desde que nació hasta su primer parto'
						content='19 meses'
					/>
				</div>
				<button
					className={` text-white px-16 rounded-lg py-2 font-bold flex items-center justify-center gap-3 bg-blueEdit self-center`}
					onClick={onClick}
				>
					Editar
				</button>
				{showEditForm && (
					<div ref={editFormRef}>
						<EditParto
							reproduccionAnimalInfo={reproduccionAnimalInfo}
						/>
					</div>
				)}

				<div className='flex flex-col gap-5'>
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
				</div>
			</div>
		</div>
	);
};
