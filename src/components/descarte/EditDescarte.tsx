import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDescarteStore, useGeneralStore } from '../../store';
import { SelectForm } from '../shared/SelectForm';
import { InputForm } from '../shared/InputForm';
import { ButtonAction } from '../shared/ButtonAction';
import { Animal } from '../../interfaces';

interface EditDescarteProps {
	animalById: Animal;
}

export const EditDescarte: React.FC<EditDescarteProps> = ({
	animalById,
}) => {
	const descarte = useDescarteStore(state => state.descarte);

	const {
		formState: { errors },
		register,
		setValue,
		reset,
		handleSubmit,
		watch,
	} = useForm();

	useEffect(() => {
		if (descarte) {
			reset({
				fechaDescarte: descarte.fechaDescarte,
				causaGeneralId: descarte.causaGeneral.id,
				causaEspecificaId: descarte?.causaEspecifica?.id,
			});
		}
	}, []);

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
	const updateDescarte = useDescarteStore(
		state => state.updateDescarte
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

			// Resetear el valor de la causa específica si la causa general cambia
			setValue('causaEspecificaId', null);
		}
	}, [causaGeneralIdSelected]);

	const onEditSubmit = handleSubmit(async data => {
		const newDescarte: any = {
			...data,
		};

		console.log(newDescarte);

		try {
			await updateDescarte(newDescarte, animalById.id, descarte!.id);
			setIsOpenModal(false);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	return (
		<form
			className='flex flex-col gap-5  h-full'
			onSubmit={onEditSubmit}
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
					initialValue={descarte?.causaGeneral.id}
				/>
				{causasEspecificasFiltradas.length > 0 && (
					<SelectForm
						items={causasEspecificasFiltradas}
						label='Causa Específica'
						setValue={setValue}
						register={register}
						name='causaEspecificaId'
						errors={errors}
						initialValue={descarte?.causaEspecifica.id}
						required={true}
					/>
				)}
			</div>
			<ButtonAction textLabel='Actualizar' />
		</form>
	);
};
