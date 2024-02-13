import { useForm } from 'react-hook-form';
import { InputForm } from '../../shared/InputForm';
import { ButtonAction } from '../../shared/ButtonAction';
import { useAnimalesStore } from '../../../store/animales';
import { Animal } from '../../../interfaces';

interface AddSanidadProps {
	setIsOpenModalLocal: (value: boolean) => void;
	animalById: Animal;
}

export const AddSanidad: React.FC<AddSanidadProps> = ({
	setIsOpenModalLocal,
	animalById,
}) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const createSanidad = useAnimalesStore(
		state => state.createSanidad
	);
	const sanidad = useAnimalesStore(state => state.sanidad);

	const minDate =
		sanidad.length > 0
			? sanidad[sanidad.length - 1].fechaRegistro
			: animalById.fechaNacimiento;

	const onAddSubmit = handleSubmit(async data => {
		const sanidad: any = {
			...data,
		};
		await createSanidad(sanidad, animalById.id);
		setIsOpenModalLocal(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onAddSubmit}
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
						minDate={minDate}
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
