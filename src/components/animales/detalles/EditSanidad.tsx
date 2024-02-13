import { useEffect } from 'react';
import { InputForm } from '../../shared/InputForm';
import { useAnimalesStore } from '../../../store/animales';
import { useForm } from 'react-hook-form';
import { ButtonAction } from '../../shared/ButtonAction';
import { Animal, Sanidad } from '../../../interfaces';

interface EditSanidadProps {
	setIsOpenModalLocal: (value: boolean) => void;
	sanidadAnimal: Sanidad | null;
	animalById: Animal;
	setSelectedSanidad: React.Dispatch<
		React.SetStateAction<Sanidad | null>
	>;
}

export const EditSanidad: React.FC<EditSanidadProps> = ({
	setIsOpenModalLocal,
	animalById,
	sanidadAnimal,
	setSelectedSanidad,
}) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const updateSanidad = useAnimalesStore(
		state => state.updateSanidad
	);
	const sanidad = useAnimalesStore(state => state.sanidad);

	const sanidadOrdenadas = [...sanidad].sort(
		(a, b) =>
			new Date(a.fechaRegistro).getTime() -
			new Date(b.fechaRegistro).getTime()
	);

	const indiceActual = sanidadOrdenadas.findIndex(
		sanidad => sanidad.id === sanidadAnimal?.id
	);

	// Encuentra la fecha mínima (del registro anterior, si existe)
	const fechaMin =
		indiceActual > 0
			? sanidadOrdenadas[indiceActual - 1].fechaRegistro
			: animalById.fechaNacimiento;

	// Encuentra la fecha máxima (del registro siguiente, si existe)
	const fechaMax =
		indiceActual < sanidadOrdenadas.length - 1
			? sanidadOrdenadas[indiceActual + 1].fechaRegistro
			: undefined;

	const onEditSubmit = handleSubmit(async data => {
		const alimentacion: any = {
			...data,
		};
		await updateSanidad(
			alimentacion,
			animalById.id,
			sanidadAnimal!.id
		);

		setIsOpenModalLocal(false);
		setSelectedSanidad(null);
	});

	useEffect(() => {
		if (sanidadAnimal) {
			reset({
				fechaRegistro: sanidadAnimal.fechaRegistro,
				observaciones: sanidadAnimal.observaciones,
			});
		}
	}, []);

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditSubmit}
		>
			<div className='grid grid-cols-2 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[75%] px-5'>
				<div className='col-span-2'>
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
				</div>
				<div className='col-span-2 '>
					<InputForm
						label='observaciones'
						placeholder='Ejm: lorem500000'
						name='observaciones'
						type='text'
						register={register}
						errors={errors}
						isTextarea={true}
						required={true}
					/>
				</div>
			</div>
			<ButtonAction textLabel='Guardar' />
		</form>
	);
};
