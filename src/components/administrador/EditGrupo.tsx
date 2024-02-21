import React, { useEffect } from 'react';
import { Grupo } from '../../interfaces';
import { InputForm } from '../shared/InputForm';
import { ButtonAction } from '../shared/ButtonAction';
import { useForm } from 'react-hook-form';
import { useAnimalesStore } from '../../store/animales';

interface EditGrupoProps {
	grupo: Grupo;
	setIsModalGrupoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditGrupo: React.FC<EditGrupoProps> = ({
	grupo,
	setIsModalGrupoOpen,
}) => {
	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm();

	useEffect(() => {
		if (grupo) {
			reset({
				descripcion: grupo.descripcion,
			});
		}
	}, []);

	const updateGrupo = useAnimalesStore(state => state.updateGrupo);

	const onEditSubmit = handleSubmit(async data => {
		const updatedGrupo: any = {
			...data,
		};

		updateGrupo(updatedGrupo, grupo.id);
		setIsModalGrupoOpen(false);
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditSubmit}
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
