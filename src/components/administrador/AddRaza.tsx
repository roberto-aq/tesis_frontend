import { useForm } from 'react-hook-form';
import { InputForm } from '../shared/InputForm';
import { ButtonAction } from '../shared/ButtonAction';
import { useAnimalesStore } from '../../store/animales';

interface AddRazaProps {
	setIsModalRazaOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddRaza: React.FC<AddRazaProps> = ({
	setIsModalRazaOpen,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const createRaza = useAnimalesStore(state => state.createRaza);

	const onAddSubmit = handleSubmit(async data => {
		const raza: any = {
			...data,
		};

		createRaza(raza);
		setIsModalRazaOpen(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onAddSubmit}
		>
			<div className='grid grid-cols-1 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[75%] px-5'>
				<InputForm
					label='Nombre de la raza'
					placeholder='Ejm: Holstein'
					name='nombre'
					type='text'
					register={register}
					errors={errors}
					required={true}
				/>
			</div>
			<ButtonAction textLabel='Guardar' />
		</form>
	);
};
