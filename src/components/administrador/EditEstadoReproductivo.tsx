import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { EstadoReproductivo } from '../../interfaces/animal.interface';
import { InputForm } from '../shared/InputForm';
import { ButtonAction } from '../shared/ButtonAction';
import { useAnimalesStore } from '../../store/animales';

interface EditEstadoReproductivoProps {
	setIsModalEstadoReproductivoOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	estadoReproductivo: EstadoReproductivo;
}

export const EditEstadoReproductivo: React.FC<
	EditEstadoReproductivoProps
> = ({ setIsModalEstadoReproductivoOpen, estadoReproductivo }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		if (estadoReproductivo) {
			reset({
				descripcion: estadoReproductivo.descripcion,
			});
		}
	}, []);

	const updateEstadoReproductivo = useAnimalesStore(
		state => state.updateEstadoReproductivo
	);

	const onEditSubmit = handleSubmit(async data => {
		const updatedEstadoReproductivo: any = {
			...data,
		};

		console.log(updatedEstadoReproductivo);
		updateEstadoReproductivo(
			updatedEstadoReproductivo,
			estadoReproductivo.id
		);
		setIsModalEstadoReproductivoOpen(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditSubmit}
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
