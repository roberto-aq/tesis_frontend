import { useForm } from 'react-hook-form';
import { useAnimalesStore } from '../../store/animales';
import { ButtonAction } from '../shared/ButtonAction';
import { InputForm } from '../shared/InputForm';

interface AddEstadoReproductivoProps {
	setIsModalEstadoReproductivoOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
}

export const AddEstadoReproductivo: React.FC<
	AddEstadoReproductivoProps
> = ({ setIsModalEstadoReproductivoOpen }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const createEstadoReproductivo = useAnimalesStore(
		state => state.createEstadoReproductivo
	);

	const onAddSubmit = handleSubmit(async data => {
		const estadoReproductivo: any = {
			...data,
		};

		createEstadoReproductivo(estadoReproductivo);
		setIsModalEstadoReproductivoOpen(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onAddSubmit}
		>
			<div className='grid grid-cols-1 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[75%] px-5'>
				<InputForm
					label='Nombre del estado reproductivo'
					placeholder='Ejm: Preñada'
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
