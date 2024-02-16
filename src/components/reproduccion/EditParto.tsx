import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { ButtonAction } from '../shared/ButtonAction';
import { useFieldArray, useForm } from 'react-hook-form';
import { MdOutlineClose } from 'react-icons/md';
import { InputForm } from '../shared/InputForm';
import { InputDisabled } from '../shared/InputDisabled';
import { ReproduccionAnimalLoader } from '../../interfaces';
import { useReproduccionStore } from '../../store/reproduccion';
import { SelectForm } from '../shared/SelectForm';

const opcionesSexo = [
	{ id: 'MACHO', nombre: 'Macho' },
	{ id: 'HEMBRA', nombre: 'Hembra' },
];

interface EditPartoProps {
	reproduccionAnimalInfo: ReproduccionAnimalLoader;
	setIsOpenModalLocal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditParto: React.FC<EditPartoProps> = ({
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
					id: '',
					fechaParto: '',
					numeroCrias: 1,
					numeroParto: 1,
					crias: [{ sexo: '' }],
				},
			],
		},
	});

	const { info: animal } = reproduccionAnimalInfo;

	const watchPartos = watch('partos');

	const partos = useReproduccionStore(state => state.partos);
	const deleteParto = useReproduccionStore(
		state => state.deleteParto
	);
	const updateMultiplePartos = useReproduccionStore(
		state => state.updateMultiplePartos
	);

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'partos',
	});

	useEffect(() => {
		const partosConFormato = partos.map(parto => ({
			...parto,
			numeroCrias: parto.crias.length,
			crias: parto.crias.map(cria => ({ sexo: cria.sexo })),
		}));

		reset({ partos: partosConFormato });
	}, [partos, reset]);

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

	const onEditSubmit = handleSubmit(data => {
		// 1. Filtrar los partos existentes que tienen un ID para actualización
		const updatedPartos = data.partos.filter(parto => parto.id);

		// 2. Filtrar los nuevos partos que no tienen ID para ser agregados
		const newPartos = data.partos.filter(parto => !parto.id);

		// 3. Preparar las crías para cada parto
		const partosPreparados: any = {
			partos: [
				...updatedPartos.map(parto => ({
					id: parto.id,
					fechaParto: parto.fechaParto,
					numeroParto: parto.numeroParto,
					crias: parto.crias.map(cria => ({
						sexo: cria.sexo,
					})),
				})),
				...newPartos.map(parto => ({
					fechaParto: parto.fechaParto,
					numeroParto: parto.numeroParto,
					crias: parto.crias.map(cria => ({
						sexo: cria.sexo,
					})),
				})),
			],
		};
		updateMultiplePartos(animal.id, partosPreparados);
		setIsOpenModalLocal(false);
	});

	const onClearParto = (index: number) => {
		remove(index);

		// Actualiza los números de partos de los partos restantes
		const updatedPartos = getValues('partos');
		updatedPartos.forEach((parto, idx) => {
			parto.numeroParto = idx + 1; // Reasignar el número de parto
		});
		reset({ partos: updatedPartos }); // Actualizar el formulario con los partos actualizados

		if (partos[index].id) {
			deleteParto(animal.id, partos[index].id);
		}
	};

	const onAddParto = () => {
		append({
			id: '',
			fechaParto: '',
			numeroCrias: 1,
			numeroParto: fields.length + 1,
			crias: [{ sexo: '' }],
		});
	};

	return (
		<form
			className='flex flex-col gap-5  h-full px-5'
			onSubmit={onEditSubmit}
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
									// onChange={e =>
									// 	handleFechaServicioChange(index, e.target.value)
									// }
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
									required={true}
									onChange={e => onNumeroCriasChange(index, e)}
									errorField={
										errors?.partos?.[index]?.numeroCrias || undefined
									}
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
										initialValue={field.crias[criaIndex]?.sexo}
									/>
								))}
							</div>
							<span
								className='text-purple100 font-bold cursor-pointer '
								// Para limpiar un servicio que se había registrado previamente antes de hacer la petición
								onClick={() => onClearParto(index)}
							>
								<MdOutlineClose size={30} />
							</span>
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
