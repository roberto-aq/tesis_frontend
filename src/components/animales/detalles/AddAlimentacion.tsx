import { useForm } from 'react-hook-form';
import { InputForm } from '../../shared/InputForm';
import { ButtonAction } from '../../shared/ButtonAction';
import { useAnimalesStore } from '../../../store/animales';
import { Animal } from '../../../interfaces';

interface AddAlimentacionProps {
	setIsOpenModalLocal: (value: boolean) => void;
	animalById: Animal;
}

export const AddAlimentacion: React.FC<AddAlimentacionProps> = ({
	setIsOpenModalLocal,
	animalById,
}) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const createAlimentacion = useAnimalesStore(
		state => state.createAlimentacion
	);
	const alimentaciones = useAnimalesStore(
		state => state.alimentacion
	);

	const minDate =
		alimentaciones.length > 0
			? alimentaciones[0].fechaRegistro
			: animalById.fechaNacimiento;

	const onAddSubmit = handleSubmit(data => {
		const alimentacion: any = {
			...data,
			cantidad: +data.cantidad,
		};

		createAlimentacion(alimentacion, animalById.id);
		setIsOpenModalLocal(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onAddSubmit}
		>
			<div className='grid grid-cols-2 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[75%] px-5'>
				<InputForm
					label='fecha de registro'
					name='fechaRegistro'
					type='date'
					register={register}
					errors={errors}
					required={true}
					minDate={minDate}
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
