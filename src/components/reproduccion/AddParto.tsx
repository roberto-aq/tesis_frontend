import { FaPlus } from 'react-icons/fa6';
import { ButtonAction } from '../shared/ButtonAction';
import { MdOutlineClose } from 'react-icons/md';
import { InputDisabled } from '../shared/InputDisabled';
import { SelectForm } from '../shared/SelectForm';
import { InputForm } from '../shared/InputForm';
import { useFieldArray, useForm } from 'react-hook-form';
import { ReproduccionAnimalLoader } from '../../interfaces';
import { useReproduccionStore } from '../../store/reproduccion';

const opcionesSexo = [
	{ id: 'MACHO', nombre: 'Macho' },
	{ id: 'HEMBRA', nombre: 'Hembra' },
];

interface AddPartoProps {
	reproduccionAnimalInfo: ReproduccionAnimalLoader;
	setIsOpenModalLocal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AddParto: React.FC<AddPartoProps> = ({
	reproduccionAnimalInfo,
	setIsOpenModalLocal,
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
			partos: [
				{
					fechaParto: '',
					numeroCrias: 1,
					idEstadoReproductivo: '',
					numeroParto: 1,
					crias: [{ sexo: '' }],
				},
			],
		},
	});

	const { info: animal } = reproduccionAnimalInfo;

	const watchPartos = watch('partos');

	const createMultiplePartos = useReproduccionStore(
		state => state.createMultiplePartos
	);

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'partos',
	});

	const onNumeroCriasChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		// Actualiza el número de crías directamente
		const numeroCrias = event.target.valueAsNumber;

		// Asegúrate de que el número de crías es un número válido
		if (isNaN(numeroCrias) || numeroCrias < 0) return;

		// Actualiza el estado del formulario para el número de crías
		setValue(`partos[${index}].numeroCrias` as any, numeroCrias);

		// Actualiza el estado del formulario para las crías
		const criasArray = Array.from({ length: numeroCrias }, () => ({
			sexo: '',
		}));
		setValue(`partos[${index}].crias` as any, criasArray);
	};

	const onClearParto = (index: number) => {
		remove(index);

		// Actualiza los números de partos de los partos restantes
		const updatedPartos = getValues('partos');
		updatedPartos.forEach((parto, idx) => {
			parto.numeroParto = idx + 1; // Reasignar el número de parto
		});
		reset({ partos: updatedPartos }); // Actualizar el formulario con los partos actualizados
	};

	const onAddParto = () => {
		append({
			fechaParto: '',
			numeroCrias: 1,
			idEstadoReproductivo: '',
			numeroParto: fields.length + 1,
			crias: [{ sexo: '' }],
		});
	};

	const onAddSubmit = handleSubmit(data => {
		const partos: any = {
			partos: [
				...data.partos.map((parto, index) => ({
					fechaParto: parto.fechaParto,
					numeroParto: index + 1,
					crias: parto.crias.map(cria => ({
						sexo: cria.sexo,
					})),
				})),
			],
		};
		createMultiplePartos(animal.id, partos);

		setIsOpenModalLocal(false);
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
					<h3 className='font-bold text-3xl text-center'>Partos</h3>

					{fields.map((field, index) => (
						<div
							className='flex gap-5 items-center pr-3'
							key={field.id}
						>
							<div className='flex gap-3 '>
								<div className='bg-purple100 h-[25px] w-[25px] rounded-full'></div>
								<p className='text-purple100 font-bold'>
									Parto {field.numeroParto}
								</p>
							</div>
							<div className='grid grid-cols-2 gap-8 flex-1'>
								<InputForm
									type='date'
									label={`Fecha de Parto ${index + 1}`}
									name={`partos[${index}].fechaParto`}
									register={register}
									errors={errors}
									errorField={
										errors?.partos?.[index]?.fechaParto || undefined
									}
									required={true}
									minDate={
										index === 0
											? animal.fechaNacimiento
											: watchPartos[index - 1].fechaParto
									}
								/>
								<InputForm
									type='number'
									register={register}
									errors={errors}
									name={`partos[${index}].numeroCrias`}
									label='Número de Crías'
									placeholder='Ejem: 3'
									errorField={
										errors?.partos?.[index]?.numeroCrias || undefined
									}
									onChange={e => onNumeroCriasChange(index, e)}
									required={true}
								/>
								{Array.from({
									length:
										+watch(`partos[${index}].numeroCrias` as any) ||
										1,
								}).map((_, criaIndex) => (
									<SelectForm
										key={criaIndex}
										items={opcionesSexo}
										placeholder='Seleccione una opción:'
										label={`Sexo cría ${criaIndex + 1}`}
										name={`partos[${index}].crias[${criaIndex}].sexo`}
										register={register}
										setValue={setValue}
										errors={errors}
										required={true}
										errorField={
											errors?.partos?.[index]?.crias?.[criaIndex]
												?.sexo
										}
									/>
								))}
							</div>
							<button
								className={`text-purple100 font-bold ${
									fields.length === 1 ? 'cursor-not-allowed' : ''
								}`}
								// Para limpiar un servicio que se había registrado previamente antes de hacer la petición
								onClick={() => onClearParto(index)}
								disabled={fields.length === 1}
							>
								<MdOutlineClose size={30} />
							</button>
						</div>
					))}

					<div
						className='flex gap-5 border border-purple80 self-start py-3 px-6 rounded-md mt-4 cursor-pointer'
						onClick={onAddParto}
					>
						<div className='flex items-center justify-center bg-purple100 h-[25px] w-[25px] rounded-full'>
							<FaPlus size={13} className='text-white' />
						</div>
						<span className='font-bold text-purple100'>
							Agregar Parto
						</span>
					</div>
				</div>
			</div>
			<ButtonAction textLabel='Guardar' />
		</form>
	);
};
