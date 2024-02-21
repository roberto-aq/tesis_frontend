import { useForm } from 'react-hook-form';
import { ButtonAction } from '../shared/ButtonAction';
import { InputForm } from '../shared/InputForm';
import { useDescarteStore } from '../../store';

interface AddCausaGeneralProps {
	setIsModalCausaGeneralOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
}

export const AddCausaGeneral: React.FC<AddCausaGeneralProps> = ({
	setIsModalCausaGeneralOpen,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const createCausaGeneral = useDescarteStore(
		state => state.createCausaGeneral
	);

	const onAddSubmit = handleSubmit(async data => {
		const causaGeneral: any = {
			...data,
		};

		createCausaGeneral(causaGeneral);
		setIsModalCausaGeneralOpen(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onAddSubmit}
		>
			<div className='grid grid-cols-1 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[75%] px-5'>
				<InputForm
					label='Nombre de la causa general'
					placeholder='Ejm: muerte'
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
