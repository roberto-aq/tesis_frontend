import { Link } from 'react-router-dom';
import { useFincasStore } from '../../store/fincas/fincas.store';

const tableHeaders = [
	'Nombre',
	'Propietario',
	'Forrajes',
	'Número de potreros',
	'Hectáreas útiles',
	'Hectáreas aprovechables',
];

export const FincasTableList = () => {
	const fincas = useFincasStore(state => state.fincas);
	const isLoading = useFincasStore(state => state.isLoading);

	return (
		<div className='overflow-x-auto'>
			<div className='flex flex-col'>
				{/* ROW TITLE */}
				<div className='grid grid-cols-6 bg-purple80 py-4  px-6 items-center justify-center rounded-[5px]'>
					{tableHeaders.map(header => (
						<h4
							className='font-bold text-white text-center text-sm'
							key={header}
						>
							{header}
						</h4>
					))}
				</div>
				{isLoading && (
					<div className='flex justify-center items-center h-28'>
						<p className='text-xl font-bold text-primaryGray'>
							Cargando...
						</p>
					</div>
				)}
				{fincas.length > 0 ? (
					<>
						{fincas.map((finca, index) => (
							<div
								className={`grid grid-cols-6 ${
									index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
								} py-4 rounded-[5px] px-6 items-center`}
								key={finca.id}
							>
								<Link
									to={`/inicio/fincas/${finca.id}`}
									className='font-bold text-center capitalize underline  hover:text-purple100'
								>
									{finca.nombre}
								</Link>
								<span className='font-bold text-center capitalize'>
									{finca.propietario}
								</span>
								<span className='font-bold text-center capitalize'>
									{finca.forrajes}
								</span>
								<span className='font-bold text-center capitalize'>
									{finca.numeroPotreros}
								</span>
								<span className='font-bold text-center capitalize'>
									{finca.areaTotal}
								</span>
								<span className='font-bold text-center capitalize'>
									{finca.areaAprovechable}
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
