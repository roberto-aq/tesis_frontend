import { InputForm } from '../shared/InputForm';
import { ButtonAction } from '../shared/ButtonAction';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Raza } from '../../interfaces';
import { useAnimalesStore } from '../../store/animales';

interface EditRazaProps {
	raza: Raza;
	setIsModalRazaOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditRaza: React.FC<EditRazaProps> = ({
	raza,
	setIsModalRazaOpen,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

    console.log(raza)

	const updateRaza = useAnimalesStore(state => state.updateRaza);

	const onEditSubmit = handleSubmit(async data => {
		const updatedRaza: any = {
			...data,
		};

		updateRaza(updatedRaza, raza.id);
		setIsModalRazaOpen(false);
	});

	useEffect(() => {
		if (raza) {
			reset({
				nombre: raza.nombre,
			});
		}
	}, []);

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditSubmit}
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
