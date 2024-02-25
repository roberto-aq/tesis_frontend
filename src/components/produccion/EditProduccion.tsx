import { InputDisabled } from '../shared/InputDisabled';
import { ButtonAction } from '../shared/ButtonAction';
import { InputForm } from '../shared/InputForm';
import { useForm } from 'react-hook-form';
import { Animal, ProduccionResponse } from '../../interfaces';
import { useEffect } from 'react';
import { useProduccionStore } from '../../store/produccion/produccion.store';

interface EditProduccionProps {
	animalById: Animal;
	produccion: ProduccionResponse | null;
	setIsOpenModalLocal: (value: boolean) => void;
}

export const EditProduccion: React.FC<EditProduccionProps> = ({
	animalById,
	produccion,
	setIsOpenModalLocal,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const updateProduccion = useProduccionStore(
		state => state.updateProduccion
	);

	useEffect(() => {
		if (produccion) {
			reset({
				fechaRegistro: produccion.fechaRegistro,
				totalLitros: produccion.totalLitros,
			});
		}
	}, []);

	const onEditSubmit = handleSubmit(data => {
		const produccionDto: any = {
			...data,
			totalLitros: +data.totalLitros,
		};

		updateProduccion(produccionDto, animalById.id, produccion!.id);
		setIsOpenModalLocal(false);
	});

	// TODO: De igual manera hace falta calcular los días de lactancia. La descripción esta en el AddProduccion.tsx

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditSubmit}
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
