import { Link } from 'react-router-dom';
import { useAnimalesStore } from '../../store/animales';

const tableHeaders = [
	'Nombre',
	'Numero Identificador',
	'Fecha de nacimiento',
	'Sexo',
	'Grupo',
	'Estado Reproductivo',
];

export const AnimalesTableList = () => {
	const animales = useAnimalesStore(state => state.animales);
	const isLoading = useAnimalesStore(state => state.isLoading);

	return (
		<div className='overflow-x-auto'>
			<div className='flex flex-col'>
				{/* ROW TITLE */}
				<div className='grid grid-cols-6 bg-purple80 py-4 rounded-[5px] px-6 items-center justify-center'>
					{tableHeaders.map(header => (
						<h4
							className='font-bold text-white text-center'
							key={header}
						>
							{header}
						</h4>
					))}
				</div>
				{animales.length > 0 ? (
					<>
						{animales.map((animal, index) => (
							<div
								className={`grid grid-cols-6 ${
									index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
								} py-4 rounded-[5px] px-6 items-center`}
								key={animal.id}
							>
								<Link
									to={`/inicio/animales/${animal.id}`}
									className='font-bold text-center capitalize underline  hover:text-purple100'
								>
									{animal.nombre}
								</Link>
								<span className='font-bold text-center capitalize'>
									# {animal.numeroIdentificador}
								</span>
								<span className='font-bold text-center capitalize'>
									{animal.fechaNacimiento}
								</span>
								<span className='font-bold text-center capitalize'>
									{animal.sexo}
								</span>
								<span className='font-bold text-center capitalize'>
									{animal.grupo.descripcion}
								</span>
								<span className='font-bold text-center capitalize'>
									{animal.estadoReproductivo.descripcion}
								</span>
							</div>
						))}
					</>
				) : (
					<div className='flex justify-center items-center h-28'>
						<p className='text-xl font-bold text-primaryGray'>
							No se encontró ningún resultado
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
