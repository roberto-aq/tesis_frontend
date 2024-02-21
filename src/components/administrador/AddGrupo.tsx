import { useForm } from 'react-hook-form';
import { useAnimalesStore } from '../../store/animales';
import { InputForm } from '../shared/InputForm';
import { ButtonAction } from '../shared/ButtonAction';

interface AddGrupoProps {
	setIsModalGrupoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AddGrupo: React.FC<AddGrupoProps> = ({
	setIsModalGrupoOpen,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const createGrupo = useAnimalesStore(state => state.createGrupo);

	const onAddSubmit = handleSubmit(async data => {
		const raza: any = {
			...data,
		};

		createGrupo(raza);
		setIsModalGrupoOpen(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onAddSubmit}
		>
			<div className='grid grid-cols-1 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[75%] px-5'>
				<InputForm
					label='Nombre del grupo'
					placeholder='Ejm: Vacas'
					name='descripcion'
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
