import { useEffect, useRef, useState } from 'react';
import { useAnimalesStore } from '../../store/animales';
import { Loader } from '../shared/Loader';
import { useAuthStore } from '../../store';

const tableHeaders = [
	'Nombre',
	'Numero Identificador',
	'Fecha de Registro',
	'Días de Lactancia',
	'Total de Ltrs',
];
export const ProduccionTable = () => {
	const [page, setPage] = useState(1);
	const loader = useRef(null);
	const [animalesLocales, setAnimalesLocales] = useState([]);
	const observer = useRef<IntersectionObserver>();
	const lastAnimalElementRef = useRef(null);

	const animales = useAnimalesStore(state => state.animales);
	const getAnimales = useAnimalesStore(state => state.getAnimales);
	const isLoading = useAnimalesStore(state => state.isLoading);

	const fincaId = useAuthStore(state => state.fincaId);
	const limit = 30;

	useEffect(() => {
		// Solicita más animales cuando la página cambia
		getAnimales(fincaId, page, limit);
	}, [page]);

	if (isLoading) return <Loader />;

	return (
		<div className=' h-full flex flex-col gap-6'>
			<div className='flex flex-col'>
				{/* ROW TITLE */}
				<div className='grid grid-cols-5 bg-purple80 py-4 rounded-[5px] px-6 items-center justify-center'>
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
					<div className='h-[400px] overflow-auto'>
						{animales.map((animal, index) => (
							<div
								className={`grid grid-cols-5 ${
									index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
								} py-4 rounded-[5px] px-6 items-center`}
								key={animal.id}
								ref={
									index === animales.length - 1
										? lastAnimalElementRef
										: null
								}
							>
								<span className='font-bold text-center capitalize underline  hover:text-primaryGray'>
									{animal.nombre}
								</span>
								<span className='font-bold text-center capitalize'>
									# {animal.numeroIdentificador}
								</span>
								<span className='font-bold text-center capitalize'>
									{animal.fechaNacimiento}
								</span>
								<span className='font-bold text-center capitalize'>
									{animal.sexo}
								</span>
								<input placeholder='ejem: 30ltrs' />
							</div>
						))}
					</div>
				) : (
					<div className='flex justify-center items-center h-28'>
						<p className='text-xl font-bold text-primaryGray'>
							No se encontró ningún resultado
						</p>
					</div>
				)}
			</div>
			<button className='bg-purple80 text-white self-center rounded-lg h-[45px] items-center justify-center flex px-16 font-bold'>
				Guardar
			</button>
		</div>
	);
};
