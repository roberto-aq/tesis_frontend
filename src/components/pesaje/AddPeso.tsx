import { useForm } from 'react-hook-form';
import { InputForm } from '../shared/InputForm';
import { ButtonAction } from '../shared/ButtonAction';
import { usePesajeStore } from '../../store/pesaje/pesaje.store';
import { Animal } from '../../interfaces';
import { useGeneralStore } from '../../store';

interface AddPesoProps {
	animalById: Animal;
}

export const AddPeso: React.FC<AddPesoProps> = ({ animalById }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const createPeso = usePesajeStore(state => state.createPeso);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);

	const onAddSubmit = handleSubmit(async data => {
		const peso: any = {
			...data,
			peso: +data.peso,
		};

		try {
			await createPeso(peso, animalById.id);
			setIsOpenModal(false);
		} catch (error: any) {}
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
					label='Peso registrado'
					placeholder='Ejm: 30kg'
					name='peso'
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
