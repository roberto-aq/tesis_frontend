import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputForm } from '../shared/InputForm';
import { ButtonAction } from '../shared/ButtonAction';
import { SelectForm } from '../shared/SelectForm';
import { useDescarteStore, useGeneralStore } from '../../store';
import { Animal, Causa } from '../../interfaces';

interface AddDescarteProps {
	animalById: Animal;
}

export const AddDescarte: React.FC<AddDescarteProps> = ({
	animalById,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm();

	const getCausasGenerales = useDescarteStore(
		state => state.getCausasGenerales
	);
	const getCausasEspecificasByCausaGeneralId = useDescarteStore(
		state => state.getCausasEspecificasByCausaGeneralId
	);
	const causasGenerales = useDescarteStore(
		state => state.causasGenerales
	);
	const causasEspecificasFiltradas = useDescarteStore(
		state => state.causasEspecificasFiltradas
	);
	const createDescarte = useDescarteStore(
		state => state.createDescarte
	);
	const setIsOpenModal = useGeneralStore(
		state => state.setIsOpenModal
	);

	const causaGeneralIdSelected = watch('causaGeneralId');

	useEffect(() => {
		getCausasGenerales();
	}, []);

	useEffect(() => {
		if (causaGeneralIdSelected) {
			getCausasEspecificasByCausaGeneralId(causaGeneralIdSelected);
		}
	}, [causaGeneralIdSelected]);

	const onAddSubmit = handleSubmit(async data => {
		const descarte: any = {
			...data,
		};

		try {
			await createDescarte(animalById.id, descarte);
			setIsOpenModal(false);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onAddSubmit}
		>
			<div className='grid grid-cols-2 gap-8 gap-x-12 mr-1 mb-10 overflow-auto h-[75%] px-5 scroll-container'>
				<div className='col-span-2'>
					<InputForm
						label='fecha de registro'
						placeholder='Ejm: Lulu'
						name='fechaDescarte'
						type='date'
						register={register}
						errors={errors}
						required={true}
						minDate={animalById.fechaNacimiento}
					/>
				</div>
				<SelectForm
					items={causasGenerales}
					label='Causa General'
					setValue={setValue}
					register={register}
					name='causaGeneralId'
					errors={errors}
					required={true}
				/>
				{causasEspecificasFiltradas.length > 0 && (
					<SelectForm
						items={causasEspecificasFiltradas}
						label='Causa Específica'
						setValue={setValue}
						register={register}
						name='causaEspecificaId'
						errors={errors}
						required={true}
					/>
				)}
			</div>
			<ButtonAction textLabel='Guardar' />
		</form>
	);
};
