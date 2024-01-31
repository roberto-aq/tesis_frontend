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

	const onEditSubmit = handleSubmit(async data => {
		console.log(data);
		const alimentacion: any = {
			...data,
			cantidad: +data.cantidad,
		};
		try {
			await updateAlimentacion(
				alimentacion,
				animalById.id,
				alimentacionAnimal!.id
			);
		} catch (error: any) {
			throw new Error(error);
		}
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
