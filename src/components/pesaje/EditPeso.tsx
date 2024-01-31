import { useForm } from 'react-hook-form';
import { InputForm } from '../shared/InputForm';
import { ButtonAction } from '../shared/ButtonAction';
import { Animal, PesoResponse } from '../../interfaces';
import { useEffect } from 'react';
import { usePesajeStore } from '../../store/pesaje/pesaje.store';

interface EditPesoProps {
	setIsOpenModalLocal: (value: boolean) => void;
	pesoAnimal: PesoResponse | null;
	animal: Animal;
	setSelectedPeso: React.Dispatch<
		React.SetStateAction<PesoResponse | null>
	>;
}

export const EditPeso: React.FC<EditPesoProps> = ({
	setIsOpenModalLocal,
	animal,
	pesoAnimal,
	setSelectedPeso,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const updatePeso = usePesajeStore(state => state.updatePeso);

	const onEditSubmit = handleSubmit(async data => {
		console.log(data);
		const peso: any = {
			...data,
			peso: +data.peso,
		};

		try {
			await updatePeso(peso, animal.id, pesoAnimal!.id);
		} catch (error: any) {
			throw new Error(error);
		}
		setIsOpenModalLocal(false);
		setSelectedPeso(null);
	});

	useEffect(() => {
		if (pesoAnimal) {
			reset({
				fechaRegistro: pesoAnimal.fechaRegistro,
				peso: pesoAnimal.peso,
				observaciones: pesoAnimal.observaciones,
			});
		}
	}, []);

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
