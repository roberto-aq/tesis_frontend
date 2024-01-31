import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import { ButtonAction } from '../shared/ButtonAction';
import { useFieldArray, useForm } from 'react-hook-form';
import { MdOutlineClose } from 'react-icons/md';
import { InputForm } from '../shared/InputForm';
import { InputDisabled } from '../shared/InputDisabled';
import { ReproduccionAnimalLoaderData } from '../../interfaces/loader.interface';

interface EditPartoProps {
	reproduccionAnimalInfo: ReproduccionAnimalLoaderData;
}

export const EditParto: React.FC<EditPartoProps> = ({
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
			partos: [
				{
					fechaParto: '',
					numeroCrias: 1,
					idEstadoReproductivo: '',
					numeroParto: 1,
				},
			],
		},
	});

	const { info: animal } = reproduccionAnimalInfo;

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'partos',
	});

	const onAddSubmit = handleSubmit(data => {
		console.log(data);
	});

	const onClearParto = (index: number) => {
		remove(index);
	};

	const onAddParto = () => {
		append({
			fechaParto: '',
			numeroCrias: 1,
			idEstadoReproductivo: '',
			numeroParto: 1,
		});
	};

	return (
		<form
			className='flex flex-col gap-5  h-full px-5'
			onSubmit={onAddSubmit}
		>
			<div className='flex'></div>
			<div className='flex flex-col gap-12 h-[100%] overflow-auto'>
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
						Partos
					</h3>

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
								/>
								<InputForm
									type='number'
									register={register}
									errors={errors}
									name={`partos[${index}].numeroCrias`}
									label='Número de Crías'
									placeholder='Ejem: 3'
								/>
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
