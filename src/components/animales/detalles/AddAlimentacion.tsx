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

	const onAddSubmit = handleSubmit(async data => {
		const alimentacion: any = {
			...data,
			cantidad: +data.cantidad,
		};
		try {
			await createAlimentacion(alimentacion, animalById.id);
			setIsOpenModalLocal(false);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onAddSubmit}
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
