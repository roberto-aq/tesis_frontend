import { useForm } from 'react-hook-form';
import { Alimentacion, Animal } from '../../../interfaces';
import { ButtonAction } from '../../shared/ButtonAction';
import { InputForm } from '../../shared/InputForm';
import { useEffect } from 'react';
import { useAnimalesStore } from '../../../store/animales';

interface EditAlimentacionProps {
	setIsOpenModalLocal: (value: boolean) => void;
	alimentacionAnimal: Alimentacion | null;
	animalById: Animal;
	setSelectedAlimentacion: React.Dispatch<
		React.SetStateAction<Alimentacion | null>
	>;
}

export const EditAlimentacion: React.FC<EditAlimentacionProps> = ({
	setIsOpenModalLocal,
	alimentacionAnimal,
	animalById,
	setSelectedAlimentacion,
}) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const updateAlimentacion = useAnimalesStore(
		state => state.updateAlimentacion
	);
	const alimentaciones = useAnimalesStore(
		state => state.alimentacion
	);

	const alimentacionesOrdenadas = [...alimentaciones].sort(
		(a, b) =>
			new Date(a.fechaRegistro).getTime() -
			new Date(b.fechaRegistro).getTime()
	);

	const indiceActual = alimentacionesOrdenadas.findIndex(
		alimentacion => alimentacion.id === alimentacionAnimal?.id
	);

	// Encuentra la fecha mínima (del registro anterior, si existe)
	const fechaMin =
		indiceActual > 0
			? alimentacionesOrdenadas[indiceActual - 1].fechaRegistro
			: animalById.fechaNacimiento;

	// Encuentra la fecha máxima (del registro siguiente, si existe)
	const fechaMax =
		indiceActual < alimentacionesOrdenadas.length - 1
			? alimentacionesOrdenadas[indiceActual + 1].fechaRegistro
			: undefined;

	const onEditSubmit = handleSubmit(async data => {
		const alimentacion: any = {
			...data,
			cantidad: +data.cantidad,
		};
		await updateAlimentacion(
			alimentacion,
			animalById.id,
			alimentacionAnimal!.id
		);

		setIsOpenModalLocal(false);
		setSelectedAlimentacion(null);
	});

	useEffect(() => {
		if (alimentacionAnimal) {
			reset({
				fechaRegistro: alimentacionAnimal.fechaRegistro,
				cantidad: alimentacionAnimal.cantidad,
				observaciones: alimentacionAnimal.observaciones,
			});
		}
	}, []);

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditSubmit}
		>
			<div className='grid grid-cols-2 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[75%] px-5'>
				<InputForm
					label='fecha de registro'
					placeholder='Ejm: Lulu'
					name='fechaRegistro'
					type='date'
					register={register}
					errors={errors}
					required={true}
					minDate={fechaMin}
					maxDate={fechaMax}
				/>
				<InputForm
					label='cantidad (kg)'
					placeholder='Ejm: 30kg'
					name='cantidad'
					type='number'
					register={register}
					errors={errors}
					required={true}
				/>
				<div className='col-span-2 '>
					<InputForm
						label='observaciones'
						placeholder='Ejm: lorem500000'
						name='observaciones'
						type='text'
						register={register}
						errors={errors}
						isTextarea={true}
					/>
				</div>
			</div>
			<ButtonAction textLabel='Guardar' />
		</form>
	);
};
