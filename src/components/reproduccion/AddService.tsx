import { useFieldArray, useForm } from 'react-hook-form';
import { ButtonAction } from '../shared/ButtonAction';
import { InputForm } from '../shared/InputForm';
import { SelectForm } from '../shared/SelectForm';
import { useAnimalesStore } from '../../store/animales';
import { MdOutlineClose } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { InputDisabled } from '../shared/InputDisabled';
import { diferenciasDias } from '../../helpers/formatDate';
import { ReproduccionAnimalLoader } from '../../interfaces';
import { useReproduccionStore } from '../../store/reproduccion';
import { useGeneralStore } from '../../store';

interface AddServiceProps {
	reproduccionAnimalInfo: ReproduccionAnimalLoader;
}

export const AddService: React.FC<AddServiceProps> = ({
	reproduccionAnimalInfo,
}) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		control,
		getValues,
		reset,
		watch,
	} = useForm({
		defaultValues: {
			servicios: [
				{
					fechaServicio: '',
					fechaCelo: '',
					estadoReproductivoId: '',
					numeroServicio: 1,
				},
			],
		},
	});

	const { reproduccion, info: animal } = reproduccionAnimalInfo;
	const { partos, servicios } = reproduccion;

	const watchServicios = watch('servicios');

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'servicios',
	});

	const estadosReproductivos = useAnimalesStore(
		state => state.estadosReproductivos
	);

	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);

	const createMultipleServicios = useReproduccionStore(
		state => state.createMultipleServicios
	);

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

	// Función para manejar el cambio en las fechas de servicio
	const handleFechaServicioChange = (
		index: number,
		value: string
	) => {
		setValue(`servicios.${index}.fechaServicio`, value);
	};

	const fechaUltimoParto = ultimoParto?.fechaParto;

	const onClearService = (index: number) => {
		remove(index);
		// Actualiza los números de servicio de los servicios restantes
		const updatedServices = getValues('servicios');
		updatedServices.forEach((service, idx) => {
			service.numeroServicio = idx + 1; // Reasignar el número de servicio
		});
		reset({ servicios: updatedServices }); // Actualizar el formulario con los servicios actualizados
	};

	const onAddService = () => {
		append({
			fechaServicio: '',
			fechaCelo: '',
			estadoReproductivoId: '',
			numeroServicio: fields.length + 1,
		});
	};

	const puedeAgregarServicio = () => {
		// Encuentra el último servicio con estado reproductivo "preñada"
		const ultimoServicioPreñada = watchServicios.find(
			servicio => servicio.estadoReproductivoId === '3'
		); // Asume que "3" es el ID correspondiente al estado "preñada"

		if (!ultimoServicioPreñada) return true; // Si no hay servicios con estado "preñada", permite agregar servicios

		// Calcula la fecha estimada de parto sumando 280 días a la fecha de servicio
		const fechaServicio = new Date(
			ultimoServicioPreñada.fechaServicio
		);
		const fechaEstimadaParto = new Date(
			fechaServicio.setDate(fechaServicio.getDate() + 280)
		);

		// Compara la fecha actual con la fecha estimada de parto
		return new Date() > fechaEstimadaParto; // Retorna true si la fecha actual es mayor que la fecha estimada de parto
	};

	console.log(puedeAgregarServicio());

	const onAddSubmit = handleSubmit(data => {
		const servicios: any = {
			servicios: [
				...data.servicios.map((servicio, index) => ({
					...servicio,
					numeroServicio: index + 1,
					estadoReproductivoId: +servicio.estadoReproductivoId,
				})),
			],
		};
		createMultipleServicios(animal.id, servicios);
		setIsOpenModal(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full px-5'
			onSubmit={onAddSubmit}
		>
			<div className='flex'></div>
			<div className='flex flex-col gap-12 h-[650px] overflow-auto'>
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
									minDate={
										index === 0
											? ultimoParto?.fechaParto ||
											  animal.fechaNacimiento
											: watchServicios[index - 1].fechaServicio
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
						className={`flex gap-5 border border-purple80 self-start py-3 px-6 rounded-md mt-4 ${
							puedeAgregarServicio()
								? 'cursor-pointer'
								: 'cursor-not-allowed'
						}`}
						onClick={() => {
							if (puedeAgregarServicio()) onAddService();
						}}
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
