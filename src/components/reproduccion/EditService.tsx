import { FaPlus } from 'react-icons/fa6';
import { ButtonAction } from '../shared/ButtonAction';
import { MdOutlineClose } from 'react-icons/md';
import { InputDisabled } from '../shared/InputDisabled';
import { InputForm } from '../shared/InputForm';
import { SelectForm } from '../shared/SelectForm';
import { Animal } from '../../interfaces';
import { useFieldArray, useForm } from 'react-hook-form';
import { useAnimalesStore } from '../../store/animales';
import { useReproduccionStore } from '../../store/reproduccion';
import { diferenciasDias } from '../../helpers/formatDate';
import { useEffect } from 'react';

interface EditServiceProps {
	animal: Animal;
	setIsModalEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditService: React.FC<EditServiceProps> = ({
	animal,
	setIsModalEditOpen,
}) => {
	const servicios = useReproduccionStore(state => state.servicios);
	const partos = useReproduccionStore(state => state.partos);
	const updateMultipleServicios = useReproduccionStore(
		state => state.updateMultipleServicios
	);
	console.log(servicios);

	const {
		watch,
		reset,
		register,
		handleSubmit,
		formState: { errors },
		control,
		getValues,
		setValue,
	} = useForm({
		defaultValues: {
			servicios: [
				{
					id: '',
					fechaServicio: '',
					fechaCelo: '',
					estadoReproductivoId: '',
					numeroServicio: 1,
				},
			],
		},
	});

	const watchServicios = watch('servicios');

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'servicios',
	});

	useEffect(() => {
		const serviciosConFormato = servicios.map(servicio => ({
			...servicio,
			estadoReproductivoId: servicio.estadoReproductivo.id.toString(),
		}));
		console.log(serviciosConFormato);
		reset({ servicios: serviciosConFormato });
	}, [servicios, reset]);

	const estadosReproductivos = useAnimalesStore(
		state => state.estadosReproductivos
	);

	// Función para manejar el cambio en las fechas de servicio
	const handleFechaServicioChange = (
		index: number,
		value: string
	) => {
		setValue(`servicios.${index}.fechaServicio`, value);
	};

	const ultimoParto =
		partos.length > 0
			? partos.reduce((ultimo, actual) => {
					// Convertir las fechas a objetos Date para compararlas
					const fechaUltimo = new Date(ultimo.fechaParto);
					const fechaActual = new Date(actual.fechaParto);

					// Devolver el parto más reciente
					return fechaActual > fechaUltimo ? actual : ultimo;
			  })
			: null;

	const fechaUltimoParto = ultimoParto?.fechaParto;

	const onAddService = () => {
		append({
			id: '',
			fechaServicio: '',
			fechaCelo: '',
			estadoReproductivoId: '',
			numeroServicio: fields.length + 1,
		});
	};

	const onClearService = (index: number) => {
		remove(index);
		// Actualiza los números de servicio de los servicios restantes
		const updatedServices = getValues('servicios');
		updatedServices.forEach((service, idx) => {
			service.numeroServicio = idx + 1; // Reasignar el número de servicio
		});
		reset({ servicios: updatedServices }); // Actualizar el formulario con los servicios actualizados
	};

	const onEditSubmit = handleSubmit(data => {
		const updateServicios = data.servicios.filter(
			servicio => servicio.id
		);
		const newServices = data.servicios.filter(
			servicio => servicio.id === ''
		);

		const serviciosPreparados: any = {
			servicios: [
				...updateServicios.map(servicio => ({
					id: servicio.id,
					fechaServicio: servicio.fechaServicio,
					fechaCelo: servicio.fechaCelo,
					numeroServicio: servicio.numeroServicio,
					estadoReproductivoId: +servicio.estadoReproductivoId,
				})),
				...newServices.map(servicio => ({
					fechaServicio: servicio.fechaServicio,
					fechaCelo: servicio.fechaCelo,
					numeroServicio: servicio.numeroServicio,
					estadoReproductivoId: +servicio.estadoReproductivoId,
				})),
			],
		};

		updateMultipleServicios(animal.id, serviciosPreparados);

		setIsModalEditOpen(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full px-5'
			onSubmit={onEditSubmit}
		>
			<div className='flex'></div>
			<div className='flex flex-col gap-12 h-[700px] overflow-auto'>
				<div className='grid grid-cols-2 gap-20'>
					<InputDisabled
						label='nombre'
						value={animal.nombre}
						type='text'
					/>
					<InputDisabled
						label='Número Identificador'
						value={animal.numeroIdentificador}
						type='text'
					/>
				</div>

				<div className='flex flex-col gap-5'>
					<h3 className='font-bold text-3xl text-center'>
						Servicios
					</h3>

					{fields.map((field, index) => (
						<div
							className='flex gap-5 items-center pr-3'
							key={field.id}
						>
							<div className='flex gap-3 '>
								<div className='bg-purple100 h-[25px] w-[25px] rounded-full'></div>
								<p className='text-purple100 font-bold'>
									Servicio {field.numeroServicio}
								</p>
							</div>
							<div className='grid grid-cols-2 gap-8 flex-1'>
								<InputForm
									type='date'
									label={`Fecha de Servicio ${index + 1}`}
									name={`servicios[${index}].fechaServicio`}
									register={register}
									errors={errors}
									errorField={
										errors?.servicios?.[index]?.fechaServicio ||
										undefined
									}
									required={true}
									onChange={e =>
										handleFechaServicioChange(index, e.target.value)
									}
								/>
								<SelectForm
									items={estadosReproductivos}
									label='Estado Reproductivo'
									setValue={setValue}
									register={register}
									name={`servicios[${index}].estadoReproductivoId`}
									errors={errors}
									required={true}
									errorField={
										errors?.servicios?.[index]
											?.estadoReproductivoId || undefined
									}
									initialValue={+field.estadoReproductivoId}
								/>
								<InputForm
									type='date'
									label='Fecha de Celo'
									name={`servicios.[${index}].fechaCelo`}
									register={register}
									errorField={
										errors?.servicios?.[index]?.fechaCelo || undefined
									}
									errors={errors}
									required={true}
								/>
								{field.numeroServicio === 1 ? (
									<InputDisabled
										label='Días Parto 1 Servicio'
										value={
											fechaUltimoParto &&
											watchServicios[index].fechaServicio
												? diferenciasDias(
														fechaUltimoParto,
														watchServicios[index].fechaServicio
												  ).toString()
												: 'No hay partos registrados'
										}
										type='text'
									/>
								) : (
									<InputDisabled
										label='Días entre Servicios'
										value={
											watchServicios[index - 1]?.fechaServicio &&
											watchServicios[index]?.fechaServicio
												? diferenciasDias(
														watchServicios[index - 1].fechaServicio,
														watchServicios[index].fechaServicio
												  ).toString()
												: '-'
										}
										type='text'
									/>
								)}
							</div>
							<button
								className={`text-purple100 font-bold ${
									fields.length === 1 ? 'cursor-not-allowed' : ''
								}`}
								// Para limpiar un servicio que se había registrado previamente antes de hacer la petición
								onClick={() => onClearService(index)}
								disabled={fields.length === 1}
							>
								<MdOutlineClose size={30} />
							</button>
						</div>
					))}

					<div
						className='flex gap-5 border border-purple80 self-start py-3 px-6 rounded-md mt-4 cursor-pointer'
						onClick={onAddService}
					>
						<div className='flex items-center justify-center bg-purple100 h-[25px] w-[25px] rounded-full'>
							<FaPlus size={13} className='text-white' />
						</div>
						<span className='font-bold text-purple100'>
							Agregar servicio
						</span>
					</div>
				</div>
			</div>
			<ButtonAction textLabel='Guardar' />
		</form>
	);
};
