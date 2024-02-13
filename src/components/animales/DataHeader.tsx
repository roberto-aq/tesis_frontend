import { formatearFecha } from '../../helpers/formatDate';
import { Animal } from '../../interfaces';

interface DataHeaderProps {
	animal: Animal;
}

export const DataHeader: React.FC<DataHeaderProps> = ({ animal }) => {
	const headersData = [
		{ nameHeader: 'Raza', valueHeader: animal.raza.nombre },
		{
			nameHeader: 'Número Identificador',
			valueHeader: animal.numeroIdentificador,
		},
		{ nameHeader: 'Grupo', valueHeader: animal.grupo.descripcion },
		{
			nameHeader: 'Fecha de nacimiento',
			valueHeader: formatearFecha(animal.fechaNacimiento),
		},
		{ nameHeader: 'Sexo', valueHeader: animal.sexo },
	];

	return (
		<section className='flex bg-white py-5 rounded-[8px]'>
			{headersData.map((header, index) => (
				<div
					className={`flex flex-col gap-5 ${
						index === headersData.length - 1 ? '' : 'border-r-2'
					} flex-1 pl-3`}
					key={header.nameHeader}
				>
					<span className='font-bold text-xs text-primaryGray'>
						{header.nameHeader}
					</span>
					<span className='font-bold text-sm capitalize'>
						{header.valueHeader}
					</span>
				</div>
			))}
		</section>
	);
};
