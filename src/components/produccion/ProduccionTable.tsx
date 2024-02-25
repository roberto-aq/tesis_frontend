import { useEffect, useState } from 'react';
import { useAnimalesStore } from '../../store/animales';
import { Loader } from '../shared/Loader';
import { useAuthStore } from '../../store';
import { useForm } from 'react-hook-form';
import { useReproduccionStore } from '../../store/reproduccion';
import { useProduccionStore } from '../../store/produccion/produccion.store';

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
	setPromedioLitrosDia: React.Dispatch<
		React.SetStateAction<number | null>
	>;
}

export const ProduccionTable: React.FC<ProduccionTableProps> = ({
	fecha,
	editable,
	setEditable,
	setPromedioLitrosDia,
}) => {
	const { register, handleSubmit, setValue, getValues } = useForm({
		defaultValues: {
			producciones: [
				{
					fechaRegistro: '',
					totalLitros: '',
					animalId: '',
				},
			],
		},
	});

	const [page, setPage] = useState(1);

	const animales = useAnimalesStore(state => state.animales);
	const getAnimales = useAnimalesStore(state => state.getAnimales);
	const isLoading = useAnimalesStore(state => state.isLoading);
	const isLoadingProduccion = useProduccionStore(
		state => state.isLoading
	);

	const partos = useReproduccionStore(state => state.partos);
	const getPartos = useReproduccionStore(state => state.getPartos);

	const fincaId = useAuthStore(state => state.fincaId);

	const produccionListDate = useProduccionStore(
		state => state.produccionListDate
	);
	const animalesConProduccion = useProduccionStore(
		state => state.animalesConProduccion
	);
	const setAnimalesConProduccion = useProduccionStore(
		state => state.setAnimalesConProduccion
	);
	const getProduccionByDateAndFinca = useProduccionStore(
		state => state.getProduccionByDateAndFinca
	);
	const createOrUpdateProduccion = useProduccionStore(
		state => state.createOrUpdateProduccion
	);

	const promedioLitrosDia = produccionListDate.reduce(
		(acc, curr) =>
			acc + +curr.totalLitros / produccionListDate.length,
		0
	);

	const getAnimalesSinProduccion = async () => {
		await getAnimales(fincaId, page);
		if (animales.length > 0) {
			setAnimalesConProduccion(
				animales.map(animal => ({
					...animal,
					produccion: { totalLitros: '' },
				}))
			);
		}
	};

	useEffect(() => {
		getAnimalesSinProduccion();
	}, [page, animales.length]);

	useEffect(() => {
		if (fecha) {
			const fechaFormatoISO = fecha.toISOString().split('T')[0];

			getProduccionByDateAndFinca(fechaFormatoISO, fincaId, animales);

			animalesConProduccion.forEach((animal, index) => {
				setValue(`producciones.${index}.animalId`, animal.id);
				setValue(
					`producciones.${index}.fechaRegistro`,
					fechaFormatoISO
				);
				setValue(
					`producciones.${index}.totalLitros`,
					animal.produccion ? animal.produccion.totalLitros : ''
				);
			});

			setPromedioLitrosDia(promedioLitrosDia);
		}
	}, [fecha, setValue, produccionListDate.length]);

	const onSubmit = handleSubmit(data => {
		const registrosConTotalLitros = data.producciones.filter(
			produccion => +produccion.totalLitros > 0
		);

		const producciones: any = {
			producciones: registrosConTotalLitros.map(produccion => ({
				...produccion,
				totalLitros: +produccion.totalLitros,
			})),
		};

		console.log(producciones);

		createOrUpdateProduccion(producciones);

		setEditable(false);
	});

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
						{animalesConProduccion.map((animal, index) => {
							// TODO: Calcular días de lactancia y mostrarlo en el input a partir de la fecha de registro y el último parto. Este proceso esta en el archivo functions.ts. Hace falta implementarlo
							// ! Sin embargo, hacer esto podría ser ineficiente. Necesito mandar una petición por cada animal para obtener el último parto y calcular los días de lactancia.
							// * En la página de detalles de producción de cada animal, se puede visualizar los días de lactancia.

							return (
								<div
									className={`grid grid-cols-5 ${
										index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
									} py-4 rounded-[5px] px-6 items-center`}
									key={animal.id}
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
									{isLoadingProduccion ? (
										<p className='text-purple80 text-xs text-center'>
											cargando...
										</p>
									) : (
										<input
											placeholder={editable ? 'ejem: 30' : '-'}
											type='number'
											{...register(
												`producciones.${index}.totalLitros`
											)}
											className={`${
												editable
													? 'border border-purple100'
													: 'text-purple100 text-center'
											} rounded-lg h-[45px] px-4 outline-none font-bold`}
											disabled={!editable}
											min={0}
											step={0.1}
										/>
									)}
								</div>
							);
						})}
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
