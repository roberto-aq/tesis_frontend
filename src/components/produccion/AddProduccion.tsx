import { InputForm } from '../shared/InputForm';
import { useForm } from 'react-hook-form';
import { ButtonAction } from '../shared/ButtonAction';
import { Animal, Parto } from '../../interfaces';
import { InputDisabled } from '../shared/InputDisabled';
import { useProduccionStore } from '../../store/produccion/produccion.store';
import { useGeneralStore } from '../../store';
import { calcularDiasLactancia } from '../../helpers/functions';
import { useEffect, useState } from 'react';

interface AddProduccionProps {
	animalById: Animal;
	ultimoParto: Parto;
}

export const AddProduccion: React.FC<AddProduccionProps> = ({
	animalById,
	ultimoParto,
}) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
	} = useForm();

	const createProduccion = useProduccionStore(
		state => state.createProduccion
	);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);

	const onAddSubmit = handleSubmit(data => {
		const produccionDto: any = {
			...data,
			totalLitros: +data.totalLitros,
		};
		createProduccion(produccionDto, animalById.id);
		setIsOpenModal(false);
	});

	// TODO: Calcular días de lactancia y mostrarlo en el input a partir de la fecha de registro y el último parto. Este proceso esta en el archivo functions.ts. Hace falta implementarlo

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
					label='Total de Litros'
					placeholder='Ejm: 30ltrs'
					name='totalLitros'
					type='number'
					register={register}
					errors={errors}
					required={true}
				/>
				<InputDisabled
					label='Días de Lactancia'
					type='text'
					value='-'
				/>
			</div>
			<ButtonAction textLabel='Guardar' />
		</form>
	);
};
