import { Link, useOutletContext } from 'react-router-dom';
import { CardInfo } from '../../shared/CardInfo';
import { LayoutInfoAnimal } from './LayoutInfoAnimal';
import { AnimalLoader } from '../../../interfaces';
import { formatearFecha } from '../../../helpers/formatDate';

export const GenealogiaAnimal = () => {
	const { animalInfo } = useOutletContext<AnimalLoader>();

	return (
		<LayoutInfoAnimal title='Genealogía'>
			<div className='flex flex-col p-8 gap-8'>
				<div className='flex flex-col gap-5 '>
					<h3 className='text-3xl font-bold text-center'>Madre</h3>
					<div className='grid grid-cols-3 gap-5'>
						<CardInfo
							title='Número Identificador'
							content={
								animalInfo.madre
									? animalInfo.madre.numeroIdentificador
									: '-'
							}
							tooltipText='Muestra el número identificador de la madre del animal'
						/>
						<CardInfo
							title='Nombre'
							content={
								animalInfo.madre ? animalInfo.madre.nombre : '-'
							}
							tooltipText='Muestra el nombre de la madre del animal'
						/>
						<CardInfo
							title='fecha de nacimiento'
							content={
								animalInfo.madre
									? formatearFecha(animalInfo.madre.fechaNacimiento)
									: '-'
							}
							tooltipText='Muestra la fecha de nacimiento al que pertenece el animal'
						/>
					</div>
					<Link
						to={`/inicio/animales/${animalInfo.madre?.id || ''}`}
						className='bg-purple60 self-center text-purple100 text-sm font-bold px-8 py-2 rounded-md hover:bg-purple100 hover:text-purple60 transition-all duration-300 ease-in-out text-center w-36 mx-auto'
					>
						Ver Animal
					</Link>
				</div>
				<div className='flex flex-col gap-5 '>
					<h3 className='text-3xl font-bold text-center'>Padre</h3>
					<div className='grid grid-cols-2 gap-5'>
						<CardInfo
							title='Código de registro'
							content={
								animalInfo.registroPadre
									? animalInfo.registroPadre
									: '-'
							}
							tooltipText='Muestra el código de registro del padre del Animal'
						/>
						<CardInfo
							title='Nombre'
							content={
								animalInfo.nombrePadre ? animalInfo.nombrePadre : '-'
							}
							tooltipText='Muestra el nombre del Padre del Animal'
						/>
					</div>
				</div>
			</div>
		</LayoutInfoAnimal>
	);
};
