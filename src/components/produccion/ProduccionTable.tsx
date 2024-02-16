import { useEffect, useRef, useState } from 'react';
import { useAnimalesStore } from '../../store/animales';
import { Loader } from '../shared/Loader';
import { useAuthStore } from '../../store';
import { useForm } from 'react-hook-form';
import { useReproduccionStore } from '../../store/reproduccion';

const tableHeaders = [
	'Nombre',
	'Numero Identificador',
	'Fecha de Registro',
	'Días de Lactancia',
	'Total de Ltrs',
];

interface ProduccionTableProps {
	fecha: Date | null;
	editable: boolean;
	setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProduccionTable: React.FC<ProduccionTableProps> = ({
	fecha,
	editable,
	setEditable,
}) => {
	const { register, handleSubmit, setValue, getValues } = useForm({
		defaultValues: {
			producciones: [
				{
					fechaRegistro: '',
					totalLitros: 0,
					animalId: '',
				},
			],
		},
	});

	const [page, setPage] = useState(1);
	const loader = useRef(null);
	const lastAnimalElementRef = useRef(null);

	const animales = useAnimalesStore(state => state.animales);
	const getAnimales = useAnimalesStore(state => state.getAnimales);
	const isLoading = useAnimalesStore(state => state.isLoading);

	const partos = useReproduccionStore(state => state.partos);

	const fincaId = useAuthStore(state => state.fincaId);

	useEffect(() => {
		getAnimales(fincaId, page);
	}, [page]);

	useEffect(() => {
		if (fecha) {
			// Verifica que fecha no sea null
			const fechaFormatoISO = fecha.toISOString().split('T')[0];
			animales.forEach((animal, index) => {
				setValue(`producciones.${index}.animalId`, animal.id);
				setValue(
					`producciones.${index}.fechaRegistro`,
					fechaFormatoISO
				);
			});
		}
	}, [animales, fecha, setValue]);

	const onSubmit = handleSubmit(data => {
		const registrosConTotalLitros = data.producciones.filter(
			produccion => produccion.totalLitros > 0
		);

		console.log(registrosConTotalLitros);

		setEditable(false);
	});

	if (isLoading) return <Loader />;

	return (
		<form className=' h-full flex flex-col gap-6' onSubmit={onSubmit}>
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
									{fecha?.toISOString().split('T')[0] || '-'}
								</span>
								<span className='font-bold text-center capitalize'>
									{'-'}
								</span>
								<input
									placeholder={editable ? 'ejem: 30' : '-'}
									type='number'
									{...register(`producciones.${index}.totalLitros`)}
									className={`${
										editable
											? 'border border-purple100'
											: 'text-purple100 text-center'
									} rounded-lg h-[45px] px-4 outline-none font-bold`}
									disabled={!editable}
									min={0}
									step={0.1}
								/>
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
			{editable && (
				<button className='bg-purple80 text-white self-center rounded-lg h-[45px] items-center justify-center flex px-16 font-bold'>
					Guardar
				</button>
			)}
		</form>
	);
};
